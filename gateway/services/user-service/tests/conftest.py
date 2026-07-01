import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.database import Base, engine


@pytest.fixture(scope="session", autouse=True)
def setup_database():
    # Clean up and recreate tables on the test database
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield


@pytest.fixture
def client():
    return TestClient(app)
