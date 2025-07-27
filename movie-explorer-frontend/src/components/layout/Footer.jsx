import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner py-4 mt-12">
      <div className="container mx-auto text-center text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} Movie Explorer. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
