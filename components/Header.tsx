'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="glass-effect sticky top-0 z-50 border-b">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-luxury-gold to-luxury-silver rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">ES</span>
            </div>
            <span className="text-xl font-bold text-gradient">Elite Sports Cars</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <Link href="/cars" className="text-gray-700 hover:text-gray-900 transition-colors">
              Vehicles
            </Link>
            <Link href="/brands" className="text-gray-700 hover:text-gray-900 transition-colors">
              Brands
            </Link>
            <Link href="/dealerships" className="text-gray-700 hover:text-gray-900 transition-colors">
              Locations
            </Link>
          </div>
          
          <button 
            className="md:hidden p-2 text-gray-700 hover:text-gray-900 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-sm border-t border-gray-200">
              <Link 
                href="/" 
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link 
                href="/cars" 
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                onClick={closeMobileMenu}
              >
                Vehicles
              </Link>
              <Link 
                href="/brands" 
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                onClick={closeMobileMenu}
              >
                Brands
              </Link>
              <Link 
                href="/dealerships" 
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                onClick={closeMobileMenu}
              >
                Locations
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}