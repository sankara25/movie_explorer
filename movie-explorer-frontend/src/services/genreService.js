import api from './api'

export const genreService = {
  /**
   * Get all genres
   * @returns {Promise<Genre[]>}
   */
  getGenres: async () => {
    const response = await api.get('/genres')
    return response.data
  }
}
