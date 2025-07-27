import React from 'react'
import { Link } from 'react-router-dom'
import { useMovies } from '../hooks/useMovies'
import MovieCard from '../components/movie/MovieCard'
import { ArrowRight, Film, Users, Star } from 'lucide-react'

const HomePage = () => {
  const { data: featuredMovies, isLoading } = useMovies({ limit: 8 })

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Discover Amazing Movies
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-primary-100">
          Explore thousands of films, actors, and directors
        </p>
        <Link
          to="/movies"
          className="inline-flex items-center space-x-2 bg-white text-primary-600 px-6 py-3 rounded-md font-semibold hover:bg-primary-50 transition-colors"
        >
          <span>Browse Movies</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6">
          <Film className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Extensive Movie Database</h3>
          <p className="text-gray-600">
            Browse through thousands of movies from different genres and eras
          </p>
        </div>
        <div className="text-center p-6">
          <Users className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Cast & Crew Info</h3>
          <p className="text-gray-600">
            Detailed information about actors, directors, and their filmography
          </p>
        </div>
        <div className="text-center p-6">
          <Star className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Ratings & Reviews</h3>
          <p className="text-gray-600">
            See ratings and reviews to help you discover your next favorite film
          </p>
        </div>
      </section>

      {/* Featured Movies */}
      {!isLoading && featuredMovies && featuredMovies.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Featured Movies</h2>
            <Link
              to="/movies"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMovies.slice(0, 8).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default HomePage
