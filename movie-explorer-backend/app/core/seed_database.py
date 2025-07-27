from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models

# Create database tables
models.Base.metadata.create_all(bind=engine)

def seed_database():
    """Seed the database with sample data"""
    db = SessionLocal()
    
    try:
        # Create genres
        genres_data = [
            {"name": "Action", "description": "High-energy films with lots of excitement"},
            {"name": "Drama", "description": "Character-driven narratives"},
            {"name": "Comedy", "description": "Humorous and entertaining films"},
            {"name": "Thriller", "description": "Suspenseful and intense films"},
            {"name": "Romance", "description": "Love stories and romantic narratives"},
            {"name": "Sci-Fi", "description": "Science fiction and futuristic themes"},
            {"name": "Horror", "description": "Scary and frightening films"}
        ]
        
        genres = []
        for genre_data in genres_data:
            if not db.query(models.Genre).filter(models.Genre.name == genre_data["name"]).first():
                genre = models.Genre(**genre_data)
                db.add(genre)
                genres.append(genre)
        
        db.commit()
        
        # Get all genres for reference
        all_genres = db.query(models.Genre).all()
        genre_map = {g.name: g for g in all_genres}
        
        # Create directors
        directors_data = [
            {
                "name": "Christopher Nolan",
                "bio": "British-American filmmaker known for complex narratives",
                "birth_year": 1970,
                "nationality": "British-American"
            },
            {
                "name": "Quentin Tarantino",
                "bio": "American filmmaker known for stylized violence and pop culture references",
                "birth_year": 1963,
                "nationality": "American"
            },
            {
                "name": "Steven Spielberg",
                "bio": "American filmmaker and one of the founding pioneers of the New Hollywood era",
                "birth_year": 1946,
                "nationality": "American"
            }
        ]
        
        directors = []
        for director_data in directors_data:
            if not db.query(models.Director).filter(models.Director.name == director_data["name"]).first():
                director = models.Director(**director_data)
                db.add(director)
                directors.append(director)
        
        db.commit()
        
        # Get all directors for reference
        all_directors = db.query(models.Director).all()
        director_map = {d.name: d for d in all_directors}
        
        # Create actors
        actors_data = [
            {
                "name": "Leonardo DiCaprio",
                "bio": "American actor and film producer",
                "birth_year": 1974,
                "nationality": "American"
            },
            {
                "name": "Marion Cotillard",
                "bio": "French actress known for her versatile roles",
                "birth_year": 1975,
                "nationality": "French"
            },
            {
                "name": "John Travolta",
                "bio": "American actor, producer, dancer, and singer",
                "birth_year": 1954,
                "nationality": "American"
            },
            {
                "name": "Uma Thurman",
                "bio": "American actress and model",
                "birth_year": 1970,
                "nationality": "American"
            },
            {
                "name": "Tom Hanks",
                "bio": "American actor and filmmaker",
                "birth_year": 1956,
                "nationality": "American"
            }
        ]
        
        actors = []
        for actor_data in actors_data:
            if not db.query(models.Actor).filter(models.Actor.name == actor_data["name"]).first():
                actor = models.Actor(**actor_data)
                db.add(actor)
                actors.append(actor)
        
        db.commit()
        
        # Get all actors for reference
        all_actors = db.query(models.Actor).all()
        actor_map = {a.name: a for a in all_actors}
        
        # Create movies
        movies_data = [
            {
                "title": "Inception",
                "description": "A thief who steals corporate secrets through dream-sharing technology",
                "release_year": 2010,
                "duration": 148,
                "rating": 8.8,
                "director": "Christopher Nolan",
                "genres": ["Action", "Sci-Fi", "Thriller"],
                "actors": ["Leonardo DiCaprio", "Marion Cotillard"]
            },
            {
                "title": "Pulp Fiction",
                "description": "The lives of two mob hitmen, a boxer, and other criminals intertwine",
                "release_year": 1994,
                "duration": 154,
                "rating": 8.9,
                "director": "Quentin Tarantino",
                "genres": ["Drama", "Thriller"],
                "actors": ["John Travolta", "Uma Thurman"]
            },
            {
                "title": "Forrest Gump",
                "description": "The presidencies of Kennedy and Johnson through the eyes of an Alabama man",
                "release_year": 1994,
                "duration": 142,
                "rating": 8.8,
                "director": "Steven Spielberg",
                "genres": ["Drama", "Romance"],
                "actors": ["Tom Hanks"]
            }
        ]
        
        for movie_data in movies_data:
            if not db.query(models.Movie).filter(models.Movie.title == movie_data["title"]).first():
                movie = models.Movie(
                    title=movie_data["title"],
                    description=movie_data["description"],
                    release_year=movie_data["release_year"],
                    duration=movie_data["duration"],
                    rating=movie_data["rating"],
                    director=director_map[movie_data["director"]]
                )
                
                # Add genres
                for genre_name in movie_data["genres"]:
                    if genre_name in genre_map:
                        movie.genres.append(genre_map[genre_name])
                
                # Add actors
                for actor_name in movie_data["actors"]:
                    if actor_name in actor_map:
                        movie.actors.append(actor_map[actor_name])
                
                db.add(movie)
        
        db.commit()
        print("Database seeded successfully!")
        
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()