import api from './api'

export const directorService = {
  /**
   * Get all directors
   * @returns {Promise<Director[]>}
   */
  getDirectors: async () => {
    const response = await api.get('/directors')
    return response.data
  },

  /**
   * Get director by ID
   * @param {number} id - Director ID
   * @returns {Promise<Director>}
   */
  getDirectorById: async (id) => {
    const response = await api.get(`/directors/${id}`)
    return response.data
  }
}
