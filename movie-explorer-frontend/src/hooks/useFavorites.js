import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const FAVORITES_KEY = 'movie-explorer-favorites'

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY)
    if (stored) {
      try {
        setFavorites(JSON.parse(stored))
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error)
      }
    }
  }, [])

  const addToFavorites = (movie) => {
    setFavorites(prev => {
      const isAlreadyFavorite = prev.some(fav => fav.id === movie.id)
      if (isAlreadyFavorite) {
        toast.error('Movie is already in favorites')
        return prev
      }
      
      const updated = [...prev, movie]
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated))
      toast.success('Added to favorites')
      return updated
    })
  }

  const removeFromFavorites = (movieId) => {
    setFavorites(prev => {
      const updated = prev.filter(movie => movie.id !== movieId)
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated))
      toast.success('Removed from favorites')
      return updated
    })
  }

  const isFavorite = (movieId) => {
    return favorites.some(movie => movie.id === movieId)
  }

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  }
}
