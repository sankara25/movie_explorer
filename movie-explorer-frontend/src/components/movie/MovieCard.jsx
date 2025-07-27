import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Star, Heart } from 'lucide-react'
import { useFavorites } from '../../hooks/useFavorites'

const MovieCard = ({ movie }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const isMovieFavorite = isFavorite(movie.id)

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isMovieFavorite) {
      removeFromFavorites(movie.id)
    } else {
      addToFavorites(movie)
    }
  }

  return (
    <Link to={`/movies/${movie.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform group-hover:scale-105">
        <div className="relative">
          <img
            src={movie.poster_url || '/placeholder-movie.jpg'}
            alt={movie.title}
            className="w-full h-64 object-cover"
            onError={(e) => {
              e.target.src = '/placeholder-movie.jpg'
            }}
          />
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
              isMovieFavorite
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
            }`}
          >
            <Heart className={`h-4 w-4 ${isMovieFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{movie.title}</h3>
          
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{movie.release_year}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>{movie.rating}/10</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {movie.genres?.slice(0, 3).map((genre) => (
              <span
                key={genre.id}
                className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
              >
                {genre.name}
              </span>
            ))}
          </div>
          
          <p className="text-gray-600 text-sm line-clamp-3">{movie.description}</p>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard
