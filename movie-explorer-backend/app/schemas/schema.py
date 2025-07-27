from pydantic import BaseModel
from typing import List, Optional

# Genre schemas
class GenreBase(BaseModel):
    name: str
    description: Optional[str] = None

class GenreCreate(GenreBase):
    pass

class Genre(GenreBase):
    id: int
    
    class Config:
        from_attributes = True

# Actor schemas
class ActorBase(BaseModel):
    name: str
    bio: Optional[str] = None
    birth_year: Optional[int] = None
    nationality: Optional[str] = None
    photo_url: Optional[str] = None

class ActorCreate(ActorBase):
    pass

class Actor(ActorBase):
    id: int
    movies: List["MovieSummary"] = []
    
    class Config:
        from_attributes = True

# Director schemas
class DirectorBase(BaseModel):
    name: str
    bio: Optional[str] = None
    birth_year: Optional[int] = None
    nationality: Optional[str] = None
    photo_url: Optional[str] = None

class DirectorCreate(DirectorBase):
    pass

class Director(DirectorBase):
    id: int
    movies: List["MovieSummary"] = []
    
    class Config:
        from_attributes = True

# Movie schemas
class MovieBase(BaseModel):
    title: str
    description: Optional[str] = None
    release_year: Optional[int] = None
    duration: Optional[int] = None
    rating: Optional[float] = None
    poster_url: Optional[str] = None

class MovieCreate(MovieBase):
    director_id: Optional[int] = None
    genre_ids: List[int] = []
    actor_ids: List[int] = []

class MovieSummary(MovieBase):
    id: int
    
    class Config:
        from_attributes = True

class Movie(MovieBase):
    id: int
    director: Optional[Director] = None
    genres: List[Genre] = []
    actors: List[Actor] = []
    
    class Config:
        from_attributes = True

# Update forward references
Actor.model_rebuild()
Director.model_rebuild()