import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from inorta_backend.main import app
from inorta_backend.db.session import Base, get_db

SQLALCHEMY_DATABASE_URL = "sqlite:///./test_menus.db"
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


def test_menu_and_items():
    # Create menu
    resp = client.post('/menus', json={'name': 'Main Menu', 'location': 'header'})
    assert resp.status_code == 201
    menu = resp.json()
    assert menu['name'] == 'Main Menu'

    # Create menu item
    resp = client.post('/menu-items', json={'menu_id': menu['id'], 'label': 'Home', 'url': '/'})
    assert resp.status_code == 201
    item = resp.json()
    assert item['label'] == 'Home'

    # List items by menu
    resp = client.get(f'/menu-items?menu_id={menu["id"]}')
    assert resp.status_code == 200
    assert len(resp.json()) >= 1

    # Update item
    resp = client.put(f"/menu-items/{item['id']}", json={'label': 'Homepage'})
    assert resp.status_code == 200
    assert resp.json()['label'] == 'Homepage'

    # Delete item
    resp = client.delete(f"/menu-items/{item['id']}")
    assert resp.status_code == 204

    # Delete menu
    resp = client.delete(f"/menus/{menu['id']}")
    assert resp.status_code == 204
