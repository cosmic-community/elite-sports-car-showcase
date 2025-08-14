import Link from 'next/link'

export default function Header() {
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
          
          <button className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
}