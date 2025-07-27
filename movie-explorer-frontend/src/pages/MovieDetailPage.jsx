import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useMovie } from '../hooks/useMovies'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ErrorMessage from '../components/common/ErrorMessage'

const MovieDetailPage = () => {
  const { id } = useParams()
  const { data: movie, isLoading, error } = useMovie(id)

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage message="Failed to load movie details." />
  if (!movie) return <p>Movie not found.</p>

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      {/* Left: Movie Poster */}
      <div className="flex-shrink-0 w-full md:w-72 mb-4 md:mb-0">
        <img
          src={'/'+movie.poster_url || '/placeholder-movie.jpg'}
          alt={movie.title}
          className="w-full rounded shadow"
          onError={e => { e.target.src = '/placeholder-movie.jpg' }}
        />
      </div>
      {/* Right: Movie Details */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-4">{movie.title} ({movie.release_year})</h1>
        <p className="mb-2"><strong>Rating:</strong> {movie.rating}/10</p>
        <p className="mb-4">{movie.description}</p>
        <p className="mb-2"><strong>Director:</strong> {movie.director?.name}</p>
        <p className="mb-2"><strong>Genres:</strong> {movie.genres?.length > 0 ? movie.genres.map((g, i) => (
          <span key={g.name}>
            <Link to={`/movies?genre=${g.name}`} className="text-primary-600 hover:underline">{g.name}</Link>
            {i < movie.genres.length - 1 && ', '}
          </span>
        )) : 'N/A'}</p>
        <div>
          <h2 className="mt-6 mb-2 font-semibold text-xl">Cast</h2>
          <ul className="list-disc list-inside">
            {movie.actors?.length > 0 ? movie.actors.map(actor => (
              <li key={actor.id}>
                <Link to={`/actors/${actor.id}`} className="text-primary-600 hover:underline">{actor.name}</Link>
              </li>
            )) : <li>No cast info available.</li>}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MovieDetailPage
