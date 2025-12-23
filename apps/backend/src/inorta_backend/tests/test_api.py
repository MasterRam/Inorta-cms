import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from inorta_backend.main import app
from inorta_backend.db.session import Base, get_db

# Create test database
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
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
    """Create and drop tables for each test"""
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


def test_read_root():
    """Test root endpoint"""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "service" in data
    assert "status" in data


def test_health_check():
    """Test health endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_create_user():
    """Test user creation"""
    response = client.post(
        "/api/users",
        json={"email": "test@example.com", "name": "Test User"}
    )
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "test@example.com"
    assert data["name"] == "Test User"
    assert "id" in data


def test_create_duplicate_user():
    """Test duplicate user creation fails"""
    # Create first user
    client.post(
        "/api/users",
        json={"email": "test@example.com", "name": "Test User"}
    )
    
    # Try to create duplicate
    response = client.post(
        "/api/users",
        json={"email": "test@example.com", "name": "Another User"}
    )
    assert response.status_code == 400


def test_get_users():
    """Test getting all users"""
    # Create test users
    client.post("/api/users", json={"email": "user1@example.com", "name": "User 1"})
    client.post("/api/users", json={"email": "user2@example.com", "name": "User 2"})
    
    response = client.get("/api/users")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2


def test_get_user_by_id():
    """Test getting user by ID"""
    # Create user
    create_response = client.post(
        "/api/users",
        json={"email": "test@example.com", "name": "Test User"}
    )
    user_id = create_response.json()["id"]
    
    # Get user
    response = client.get(f"/api/users/{user_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == user_id
    assert data["email"] == "test@example.com"


def test_get_nonexistent_user():
    """Test getting non-existent user"""
    response = client.get("/api/users/999")
    assert response.status_code == 404


def test_update_user():
    """Test updating user"""
    # Create user
    create_response = client.post(
        "/api/users",
        json={"email": "test@example.com", "name": "Test User"}
    )
    user_id = create_response.json()["id"]
    
    # Update user
    response = client.put(
        f"/api/users/{user_id}",
        json={"name": "Updated Name"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Updated Name"
    assert data["email"] == "test@example.com"


def test_delete_user():
    """Test deleting user"""
    # Create user
    create_response = client.post(
        "/api/users",
        json={"email": "test@example.com", "name": "Test User"}
    )
    user_id = create_response.json()["id"]
    
    # Delete user
    response = client.delete(f"/api/users/{user_id}")
    assert response.status_code == 204
    
    # Verify user is deleted
    get_response = client.get(f"/api/users/{user_id}")
    assert get_response.status_code == 404
