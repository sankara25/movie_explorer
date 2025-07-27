import React from 'react'
import { AlertCircle } from 'lucide-react'

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="text-center py-12">
      <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Something went wrong</h3>
      <p className="text-gray-600 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
