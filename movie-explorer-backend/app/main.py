from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from app.models import model as models
from app.schemas import schema as schemas
from app.models import crud
from app.core.database import SessionLocal, engine

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Movie Explorer API",
    description="A comprehensive API for exploring movies, actors, directors, and genres",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Movies endpoints
@app.get("/movies/", response_model=List[schemas.Movie])
def read_movies(
    skip: int = 0,
    limit: int = 100,
    search: Optional[str] = None,
    genre: Optional[str] = None,
    director: Optional[str] = None,
    actor: Optional[str] = None,
    release_year: Optional[int] = None,
    db: Session = Depends(get_db)
):
    """
    Retrieve movies with optional filtering by name, genre, director, actor, or release year
    """
    return crud.get_movies(
        db, skip=skip, limit=limit, name=search,
        genre=genre, director=director, actor=actor, release_year=release_year
    )

@app.get("/movies/{movie_id}", response_model=schemas.Movie)
def read_movie(movie_id: int, db: Session = Depends(get_db)):
    """
    Get a specific movie by ID with all related information
    """
    db_movie = crud.get_movie(db, movie_id=movie_id)
    if db_movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    return db_movie

@app.post("/movies/", response_model=schemas.Movie)
def create_movie(movie: schemas.MovieCreate, db: Session = Depends(get_db)):
    """
    Create a new movie
    """
    return crud.create_movie(db=db, movie=movie)

# Actors endpoints
@app.get("/actors/", response_model=List[schemas.Actor])
def read_actors(
    skip: int = 0,
    limit: int = 100,
    genre: Optional[str] = None,
    movie: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    Retrieve actors with optional filtering by movies or genres they acted in
    """
    return crud.get_actors(db, skip=skip, limit=limit, genre=genre, movie=movie)

@app.get("/actors/{actor_id}", response_model=schemas.Actor)
def read_actor(actor_id: int, db: Session = Depends(get_db)):
    """
    Get a specific actor by ID with all related movies
    """
    db_actor = crud.get_actor(db, actor_id=actor_id)
    if db_actor is None:
        raise HTTPException(status_code=404, detail="Actor not found")
    return db_actor

@app.post("/actors/", response_model=schemas.Actor)
def create_actor(actor: schemas.ActorCreate, db: Session = Depends(get_db)):
    """
    Create a new actor
    """
    return crud.create_actor(db=db, actor=actor)

# Directors endpoints
@app.get("/directors/", response_model=List[schemas.Director])
def read_directors(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Retrieve all directors
    """
    return crud.get_directors(db, skip=skip, limit=limit)

@app.get("/directors/{director_id}", response_model=schemas.Director)
def read_director(director_id: int, db: Session = Depends(get_db)):
    """
    Get a specific director by ID with all their movies
    """
    db_director = crud.get_director(db, director_id=director_id)
    if db_director is None:
        raise HTTPException(status_code=404, detail="Director not found")
    return db_director

@app.post("/directors/", response_model=schemas.Director)
def create_director(director: schemas.DirectorCreate, db: Session = Depends(get_db)):
    """
    Create a new director
    """
    return crud.create_director(db=db, director=director)

# Genres endpoints
@app.get("/genres/", response_model=List[schemas.Genre])
def read_genres(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Retrieve all genres
    """
    return crud.get_genres(db, skip=skip, limit=limit)

@app.get("/genres/{genre_id}", response_model=schemas.Genre)
def read_genre(genre_id: int, db: Session = Depends(get_db)):
    """
    Get a specific genre by ID with all movies in that genre
    """
    db_genre = crud.get_genre(db, genre_id=genre_id)
    if db_genre is None:
        raise HTTPException(status_code=404, detail="Genre not found")
    return db_genre

@app.post("/genres/", response_model=schemas.Genre)
def create_genre(genre: schemas.GenreCreate, db: Session = Depends(get_db)):
    """
    Create a new genre
    """
    return crud.create_genre(db=db, genre=genre)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)