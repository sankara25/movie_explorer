from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
from typing import List, Optional
from app.models import model as models
from app.schemas import schema as schemas

# Movie CRUD operations
def get_movie(db: Session, movie_id: int):
    """Get a single movie by ID"""
    return db.query(models.Movie).filter(models.Movie.id == movie_id).first()

def get_movies(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    name: Optional[str] = None,
    genre: Optional[str] = None,
    director: Optional[str] = None,
    actor: Optional[str] = None,
    release_year: Optional[int] = None
):
    """Get movies with optional filtering"""
    query = db.query(models.Movie)

    if name:
        query = query.filter(models.Movie.title.ilike(f"%{name}%"))

    # Apply filters
    if genre:
        query = query.join(models.Movie.genres).filter(models.Genre.name.ilike(f"%{genre}%"))

    if director:
        query = query.join(models.Movie.director).filter(models.Director.name.ilike(f"%{director}%"))

    if actor:
        query = query.join(models.Movie.actors).filter(models.Actor.name.ilike(f"%{actor}%"))

    if release_year:
        query = query.filter(models.Movie.release_year == release_year)

    return query.offset(skip).limit(limit).all()

def create_movie(db: Session, movie: schemas.MovieCreate):
    """Create a new movie"""
    # Create movie instance
    db_movie = models.Movie(
        title=movie.title,
        description=movie.description,
        release_year=movie.release_year,
        duration=movie.duration,
        rating=movie.rating,
        poster_url=movie.poster_url,
        director_id=movie.director_id
    )

    # Add genres
    if movie.genre_ids:
        genres = db.query(models.Genre).filter(models.Genre.id.in_(movie.genre_ids)).all()
        db_movie.genres = genres

    # Add actors
    if movie.actor_ids:
        actors = db.query(models.Actor).filter(models.Actor.id.in_(movie.actor_ids)).all()
        db_movie.actors = actors

    db.add(db_movie)
    db.commit()
    db.refresh(db_movie)
    return db_movie

# Actor CRUD operations
def get_actor(db: Session, actor_id: int):
    """Get a single actor by ID"""
    return db.query(models.Actor).filter(models.Actor.id == actor_id).first()

def get_actors(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    genre: Optional[str] = None,
    movie: Optional[str] = None
):
    """Get actors with optional filtering"""
    query = db.query(models.Actor)

    if genre:
        query = query.join(models.Actor.movies).join(models.Movie.genres).filter(
            models.Genre.name.ilike(f"%{genre}%")
        )

    if movie:
        query = query.join(models.Actor.movies).filter(
            models.Movie.title.ilike(f"%{movie}%")
        )

    return query.offset(skip).limit(limit).all()

def create_actor(db: Session, actor: schemas.ActorCreate):
    """Create a new actor"""
    db_actor = models.Actor(**actor.dict())
    db.add(db_actor)
    db.commit()
    db.refresh(db_actor)
    return db_actor

# Director CRUD operations
def get_director(db: Session, director_id: int):
    """Get a single director by ID"""
    return db.query(models.Director).filter(models.Director.id == director_id).first()

def get_directors(db: Session, skip: int = 0, limit: int = 100):
    """Get all directors"""
    return db.query(models.Director).offset(skip).limit(limit).all()

def create_director(db: Session, director: schemas.DirectorCreate):
    """Create a new director"""
    db_director = models.Director(**director.dict())
    db.add(db_director)
    db.commit()
    db.refresh(db_director)
    return db_director

# Genre CRUD operations
def get_genre(db: Session, genre_id: int):
    """Get a single genre by ID"""
    return db.query(models.Genre).filter(models.Genre.id == genre_id).first()

def get_genres(db: Session, skip: int = 0, limit: int = 100):
    """Get all genres"""
    return db.query(models.Genre).offset(skip).limit(limit).all()

def create_genre(db: Session, genre: schemas.GenreCreate):
    """Create a new genre"""
    db_genre = models.Genre(**genre.dict())
    db.add(db_genre)
    db.commit()
    db.refresh(db_genre)
    return db_genre