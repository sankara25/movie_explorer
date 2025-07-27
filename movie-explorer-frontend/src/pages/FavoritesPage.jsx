import React from 'react'
import MovieCard from '../components/movie/MovieCard'
import { useFavorites } from '../hooks/useFavorites'

const FavoritesPage = () => {
  const { favorites } = useFavorites()

  if (!favorites || favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">You have no favorite movies yet.</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Favorite Movies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {favorites.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default FavoritesPage
