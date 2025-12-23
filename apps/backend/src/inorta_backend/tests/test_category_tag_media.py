import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from inorta_backend.main import app
from inorta_backend.db.session import Base, get_db

SQLALCHEMY_DATABASE_URL = "sqlite:///./test_cat_tag_media.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)


@pytest.fixture(autouse=True)
def setup_database():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


def test_category_crud():
    # Create
    resp = client.post('/categories', json={'name': 'News', 'slug': 'news'})
    assert resp.status_code == 201
    cat = resp.json()
    assert cat['name'] == 'News'

    # List
    resp = client.get('/categories')
    assert resp.status_code == 200
    assert len(resp.json()) >= 1

    # Update
    resp = client.put(f"/categories/{cat['id']}", json={'description': 'News items'})
    assert resp.status_code == 200
    assert resp.json()['description'] == 'News items'

    # Delete
    resp = client.delete(f"/categories/{cat['id']}")
    assert resp.status_code == 204


def test_tag_crud():
    resp = client.post('/tags', json={'name': 'python', 'slug': 'python'})
    assert resp.status_code == 201
    tag = resp.json()
    assert tag['slug'] == 'python'

    resp = client.get('/tags')
    assert resp.status_code == 200
    assert len(resp.json()) >= 1

    resp = client.put(f"/tags/{tag['id']}", json={'name': 'py'})
    assert resp.status_code == 200
    assert resp.json()['name'] == 'py'

    resp = client.delete(f"/tags/{tag['id']}")
    assert resp.status_code == 204


def test_media_crud():
    # Create a user for uploaded_by
    create_user = client.post('/api/users', json={'email': 'uploader@example.com', 'name': 'Uploader'})
    user_id = create_user.json()['id']

    resp = client.post('/media', json={'filename': 'file.jpg', 'file_path': '/uploads/file.jpg', 'uploaded_by': user_id})
    assert resp.status_code == 201
    media = resp.json()
    assert media['filename'] == 'file.jpg'

    resp = client.get('/media')
    assert resp.status_code == 200
    assert len(resp.json()) >= 1

    resp = client.put(f"/media/{media['id']}", json={'alt_text': 'An image'})
    assert resp.status_code == 200
    assert resp.json()['alt_text'] == 'An image'

    resp = client.delete(f"/media/{media['id']}")
    assert resp.status_code == 204