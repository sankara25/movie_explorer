import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { actorService } from '../services/actorService'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ErrorMessage from '../components/common/ErrorMessage'

const ActorPage = () => {
  const { id } = useParams()
  const { data: actor, isLoading, error } = useQuery(['actor', id], () => actorService.getActorById(id))

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage message="Failed to load actor details." />
  if (!actor) return <p>Actor not found.</p>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{actor.name}</h1>
      <img
        src={actor.photo_url || '/placeholder-person.jpg'}
        alt={actor.name}
        className="mb-4 max-w-xs"
        onError={(e) => { e.target.src = '/placeholder-person.jpg' }}
      />
      <p className="mb-2"><strong>Birth Date:</strong> {actor.birth_date || 'N/A'}</p>
      <p className="mb-4">{actor.bio}</p>

      <div>
        <h2 className="mt-6 mb-2 font-semibold text-xl">Movies</h2>
        {actor.movies && actor.movies.length > 0 ? (
          <ul className="list-disc list-inside">
            {actor.movies.map(movie => (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`} className="text-primary-600 hover:underline">
                  {movie.title} ({movie.release_year})
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No movies found for this actor.</p>
        )}
      </div>
    </div>
  )
}

export default ActorPage
