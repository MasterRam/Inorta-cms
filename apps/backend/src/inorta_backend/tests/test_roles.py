import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from inorta_backend.main import app
from inorta_backend.db.session import Base, get_db

SQLALCHEMY_DATABASE_URL = "sqlite:///./test_roles.db"
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


def test_create_role():
    response = client.post("/roles", json={"name": "editor", "description": "Can edit posts"})
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "editor"


def test_get_roles():
    client.post("/roles", json={"name": "author", "description": "Author role"})
    response = client.get("/roles")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1


def test_update_role():
    create = client.post("/roles", json={"name": "contrib", "description": "Contrib"})
    role_id = create.json()["id"]
    response = client.put(f"/roles/{role_id}", json={"description": "Contributor"})
    assert response.status_code == 200
    assert response.json()["description"] == "Contributor"


def test_delete_role():
    create = client.post("/roles", json={"name": "to-delete", "description": "Temp"})
    role_id = create.json()["id"]
    response = client.delete(f"/roles/{role_id}")
    assert response.status_code == 204


def test_duplicate_role_fails():
    client.post("/roles", json={"name": "unique", "description": "x"})
    response = client.post("/roles", json={"name": "unique", "description": "dup"})
    assert response.status_code == 400
