import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { directorService } from '../services/directorService'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ErrorMessage from '../components/common/ErrorMessage'

const DirectorPage = () => {
  const { id } = useParams()
  const { data: director, isLoading, error } = useQuery(['director', id], () => directorService.getDirectorById(id))

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage message="Failed to load director details." />
  if (!director) return <p>Director not found.</p>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{director.name}</h1>
      <img
        src={director.photo_url || '/placeholder-person.jpg'}
        alt={director.name}
        className="mb-4 max-w-xs"
        onError={(e) => { e.target.src = '/placeholder-person.jpg' }}
      />
      <p className="mb-2"><strong>Birth Date:</strong> {director.birth_date || 'N/A'}</p>
      <p className="mb-4">{director.bio}</p>

      <div>
        <h2 className="mt-6 mb-2 font-semibold text-xl">Movies Directed</h2>
        {director.movies && director.movies.length > 0 ? (
          <ul className="list-disc list-inside">
            {director.movies.map(movie => (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`} className="text-primary-600 hover:underline">
                  {movie.title} ({movie.release_year})
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No movies found for this director.</p>
        )}
      </div>
    </div>
  )
}

export default DirectorPage
