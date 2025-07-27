import React, { useState } from 'react'
import { useMovies } from '../hooks/useMovies'
import MovieGrid from '../components/movie/MovieGrid'
import MovieFilters from '../components/movie/MovieFilters'

const MoviesPage = () => {
  const [filters, setFilters] = useState({
    search: '',
    genre: '',
    director: '',
    actor: '',
    release_year: ''
  })

  const { data: movies, isLoading, error } = useMovies(filters)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Movies</h1>
        <p className="text-gray-600">
          Discover and explore our collection of movies
        </p>
      </div>

      <MovieFilters
        filters={filters}
        onFiltersChange={setFilters}
      />

      <MovieGrid
        movies={movies}
        isLoading={isLoading}
        error={error}
      />
    </div>
  )
}

export default MoviesPage
