import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from main import app, get_db
from database import Base
import models

# Test database
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
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

def test_create_genre():
    """Test creating a new genre"""
    response = client.post(
        "/genres/",
        json={"name": "Action", "description": "Action movies"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Action"
    assert "id" in data

def test_get_genres():
    """Test getting all genres"""
    # First create a genre
    client.post("/genres/", json={"name": "Drama", "description": "Drama movies"})
    
    response = client.get("/genres/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) > 0
    assert data[0]["name"] == "Drama"

def test_create_director():
    """Test creating a new director"""
    response = client.post(
        "/directors/",
        json={
            "name": "Christopher Nolan",
            "bio": "British filmmaker",
            "birth_year": 1970,
            "nationality": "British"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Christopher Nolan"
    assert "id" in data

def test_create_actor():
    """Test creating a new actor"""
    response = client.post(
        "/actors/",
        json={
            "name": "Leonardo DiCaprio",
            "bio": "American actor",
            "birth_year": 1974,
            "nationality": "American"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Leonardo DiCaprio"
    assert "id" in data

def test_create_movie():
    """Test creating a new movie"""
    # First create dependencies
    director_response = client.post(
        "/directors/",
        json={"name": "Test Director", "bio": "Test bio"}
    )
    director_id = director_response.json()["id"]
    
    genre_response = client.post(
        "/genres/",
        json={"name": "Test Genre", "description": "Test description"}
    )
    genre_id = genre_response.json()["id"]
    
    actor_response = client.post(
        "/actors/",
        json={"name": "Test Actor", "bio": "Test bio"}
    )
    actor_id = actor_response.json()["id"]
    
    # Create movie
    response = client.post(
        "/movies/",
        json={
            "title": "Test Movie",
            "description": "A test movie",
            "release_year": 2023,
            "duration": 120,
            "rating": 8.5,
            "director_id": director_id,
            "genre_ids": [genre_id],
            "actor_ids": [actor_id]
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test Movie"
    assert data["director"]["name"] == "Test Director"
    assert len(data["genres"]) == 1
    assert len(data["actors"]) == 1

def test_get_movie():
    """Test getting a specific movie"""
    # Create dependencies and movie first
    director_response = client.post("/directors/", json={"name": "Test Director 2"})
    director_id = director_response.json()["id"]
    
    movie_response = client.post(
        "/movies/",
        json={
            "title": "Test Movie 2",
            "director_id": director_id,
            "genre_ids": [],
            "actor_ids": []
        }
    )
    movie_id = movie_response.json()["id"]
    
    # Get the movie
    response = client.get(f"/movies/{movie_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test Movie 2"

def test_get_nonexistent_movie():
    """Test getting a movie that doesn't exist"""
    response = client.get("/movies/999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Movie not found"

def test_filter_movies_by_genre():
    """Test filtering movies by genre"""
    # Create test data
    genre_response = client.post("/genres/", json={"name": "Comedy"})
    genre_id = genre_response.json()["id"]
    
    director_response = client.post("/directors/", json={"name": "Comedy Director"})
    director_id = director_response.json()["id"]
    
    client.post(
        "/movies/",
        json={
            "title": "Comedy Movie",
            "director_id": director_id,
            "genre_ids": [genre_id],
            "actor_ids": []
        }
    )
    
    # Test filtering
    response = client.get("/movies/?genre=Comedy")
    assert response.status_code == 200
    data = response.json()
    assert len(data) > 0
    assert any(movie["title"] == "Comedy Movie" for movie in data)