import { useQuery } from 'react-query'
import { movieService } from '../services/movieService'

export const useMovies = (filters = {}) => {
  return useQuery(
    ['movies', filters],
    () => movieService.getMovies(filters),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    }
  )
}

export const useMovie = (id) => {
  return useQuery(
    ['movie', id],
    () => movieService.getMovieById(id),
    {
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
    }
  )
}
