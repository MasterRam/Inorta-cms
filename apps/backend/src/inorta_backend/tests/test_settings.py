import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from inorta_backend.main import app
from inorta_backend.db.session import Base, get_db

SQLALCHEMY_DATABASE_URL = "sqlite:///./test_settings.db"
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


def test_create_setting():
    resp = client.post('/settings', json={'key': 'site_name', 'value': 'Inorta CMS'})
    assert resp.status_code == 201
    data = resp.json()
    assert data['key'] == 'site_name'


def test_duplicate_setting_fails():
    client.post('/settings', json={'key': 'site_name', 'value': 'Inorta CMS'})
    resp = client.post('/settings', json={'key': 'site_name', 'value': 'Dup'})
    assert resp.status_code == 400


def test_update_setting():
    create = client.post('/settings', json={'key': 'tagline', 'value': 'Hello'})
    sid = create.json()['id']
    resp = client.put(f'/settings/{sid}', json={'value': 'Hello World'})
    assert resp.status_code == 200
    assert resp.json()['value'] == 'Hello World'


def test_delete_setting():
    create = client.post('/settings', json={'key': 'temp', 'value': 'x'})
    sid = create.json()['id']
    resp = client.delete(f'/settings/{sid}')
    assert resp.status_code == 204
