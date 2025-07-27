import api from './api'

export const movieService = {
  /**
   * Get all movies with optional filters
   * @param {Object} filters - Filter parameters
   * @param {string} filters.genre - Filter by genre
   * @param {string} filters.director - Filter by director
   * @param {number} filters.release_year - Filter by release year
   * @param {string} filters.actor - Filter by actor
   * @param {string} filters.search - Search term
   * @returns {Promise<Movie[]>}
   */
  getMovies: async (filters = {}) => {
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value)
    })
    
    const response = await api.get(`/movies?${params}`)
    return response.data
  },

  /**
   * Get movie by ID
   * @param {number} id - Movie ID
   * @returns {Promise<Movie>}
   */
  getMovieById: async (id) => {
    const response = await api.get(`/movies/${id}`)
    return response.data
  },

  /**
   * Get movie ratings
   * @param {number} movieId - Movie ID
   * @returns {Promise<Object>}
   */
  getMovieRatings: async (movieId) => {
    const response = await api.get(`/movies/${movieId}/ratings`)
    return response.data
  }
}
