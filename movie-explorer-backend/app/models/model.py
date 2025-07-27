from sqlalchemy import Column, Integer, String, Text, Float, ForeignKey, Table
from sqlalchemy.orm import relationship
from app.core.database import Base

# Association tables for many-to-many relationships
movie_genre_association = Table(
    'movie_genres',
    Base.metadata,
    Column('movie_id', Integer, ForeignKey('movies.id')),
    Column('genre_id', Integer, ForeignKey('genres.id'))
)

movie_actor_association = Table(
    'movie_actors',
    Base.metadata,
    Column('movie_id', Integer, ForeignKey('movies.id')),
    Column('actor_id', Integer, ForeignKey('actors.id'))
)

class Movie(Base):
    """
    Movie model representing a film with all its details
    """
    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), index=True, nullable=False)
    description = Column(Text)
    release_year = Column(Integer, index=True)
    duration = Column(Integer)  # in minutes
    rating = Column(Float)  # IMDb-style rating
    poster_url = Column(String(500))
    
    # Foreign key for director (one-to-many relationship)
    director_id = Column(Integer, ForeignKey('directors.id'))
    
    # Relationships
    director = relationship("Director", back_populates="movies")
    genres = relationship("Genre", secondary=movie_genre_association, back_populates="movies")
    actors = relationship("Actor", secondary=movie_actor_association, back_populates="movies")

class Actor(Base):
    """
    Actor model representing an actor/actress
    """
    __tablename__ = "actors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True, nullable=False)
    bio = Column(Text)
    birth_year = Column(Integer)
    nationality = Column(String(100))
    photo_url = Column(String(500))
    
    # Relationships
    movies = relationship("Movie", secondary=movie_actor_association, back_populates="actors")

class Director(Base):
    """
    Director model representing a film director
    """
    __tablename__ = "directors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True, nullable=False)
    bio = Column(Text)
    birth_year = Column(Integer)
    nationality = Column(String(100))
    photo_url = Column(String(500))
    
    # Relationships
    movies = relationship("Movie", back_populates="director")

class Genre(Base):
    """
    Genre model representing movie genres
    """
    __tablename__ = "genres"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, index=True, nullable=False)
    description = Column(Text)
    
    # Relationships
    movies = relationship("Movie", secondary=movie_genre_association, back_populates="genres")