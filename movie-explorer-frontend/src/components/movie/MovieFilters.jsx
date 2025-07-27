import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { Search, Filter, X } from 'lucide-react'
import { genreService } from '../../services/genreService'
import { directorService } from '../../services/directorService'

const MovieFilters = ({ filters, onFiltersChange }) => {
  const [localFilters, setLocalFilters] = useState(filters)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const { data: genres } = useQuery('genres', genreService.getGenres)
  const { data: directors } = useQuery('directors', directorService.getDirectors)

  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  const handleFilterChange = (key, value) => {
    const updated = { ...localFilters, [key]: value }
    setLocalFilters(updated)
    onFiltersChange(updated)
  }

  const clearFilters = () => {
    const cleared = {
      search: '',
      genre: '',
      director: '',
      actor: '',
      release_year: ''
    }
    setLocalFilters(cleared)
    onFiltersChange(cleared)
  }

  const hasActiveFilters = Object.values(localFilters).some(value => value !== '')

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Filter Movies
        </h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-1 text-red-600 hover:text-red-700"
          >
            <X className="h-4 w-4" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search movies..."
            value={localFilters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Advanced Filters Toggle */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
        </button>

        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
            {/* Genre Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Genre
              </label>
              <select
                value={localFilters.genre || ''}
                onChange={(e) => handleFilterChange('genre', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">All Genres</option>
                {genres?.map((genre) => (
                  <option key={genre.id} value={genre.name}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Director Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Director
              </label>
              <select
                value={localFilters.director || ''}
                onChange={(e) => handleFilterChange('director', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">All Directors</option>
                {directors?.map((director) => (
                  <option key={director.id} value={director.name}>
                    {director.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Actor Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Actor
              </label>
              <input
                type="text"
                placeholder="Enter actor name"
                value={localFilters.actor || ''}
                onChange={(e) => handleFilterChange('actor', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Release Year Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Release Year
              </label>
              <input
                type="number"
                placeholder="e.g., 2023"
                min="1900"
                max={new Date().getFullYear()}
                value={localFilters.release_year || ''}
                onChange={(e) => handleFilterChange('release_year', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieFilters
