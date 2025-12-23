import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from inorta_backend.main import app
from inorta_backend.db.session import Base, get_db

SQLALCHEMY_DATABASE_URL = "sqlite:///./test_content.db"
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


def create_user():
    resp = client.post('/api/users', json={'email': 'author@example.com', 'name': 'Author'})
    return resp.json()


def test_create_content():
    author = create_user()
    payload = {
        'title': 'My First Post',
        'slug': 'my-first-post',
        'content': 'Hello world',
        'author_id': author['id']
    }
    response = client.post('/api/contents', json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data['title'] == 'My First Post'
    assert data['slug'] == 'my-first-post'


def test_duplicate_slug_fails():
    author = create_user()
    payload = {
        'title': 'Post A',
        'slug': 'duplicate-slug',
        'content': 'A',
        'author_id': author['id']
    }
    client.post('/api/contents', json=payload)
    resp = client.post('/api/contents', json=payload)
    assert resp.status_code == 400


def test_get_contents():
    author = create_user()
    client.post('/api/contents', json={'title': 'A', 'slug': 'a', 'author_id': author['id']})
    client.post('/api/contents', json={'title': 'B', 'slug': 'b', 'author_id': author['id']})
    resp = client.get('/api/contents')
    assert resp.status_code == 200
    assert len(resp.json()) >= 2


def test_update_content():
    author = create_user()
    create = client.post('/api/contents', json={'title': 'To Update', 'slug': 'to-update', 'author_id': author['id']})
    content_id = create.json()['id']
    resp = client.put(f'/api/contents/{content_id}', json={'title': 'Updated'})
    assert resp.status_code == 200
    assert resp.json()['title'] == 'Updated'


def test_delete_content():
    author = create_user()
    create = client.post('/api/contents', json={'title': 'To Delete', 'slug': 'to-delete', 'author_id': author['id']})
    content_id = create.json()['id']
    resp = client.delete(f'/api/contents/{content_id}')
    assert resp.status_code == 204
    get_resp = client.get(f'/api/contents/{content_id}')
    assert get_resp.status_code == 404
