import api from './api'

export const actorService = {
  /**
   * Get all actors
   * @param {Object} filters - Filter parameters
   * @returns {Promise<Actor[]>}
   */
  getActors: async (filters = {}) => {
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value)
    })
    
    const response = await api.get(`/actors?${params}`)
    return response.data
  },

  /**
   * Get actor by ID
   * @param {number} id - Actor ID
   * @returns {Promise<Actor>}
   */
  getActorById: async (id) => {
    const response = await api.get(`/actors/${id}`)
    return response.data
  }
}
