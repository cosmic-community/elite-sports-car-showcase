import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-luxury-gold to-luxury-silver rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">ES</span>
              </div>
              <span className="text-xl font-bold">Elite Sports Cars</span>
            </div>
            <p className="text-gray-400 max-w-md">
              Discover the world's most exclusive sports cars from legendary brands. 
              Experience luxury, performance, and craftsmanship at its finest.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/cars" className="text-gray-400 hover:text-white transition-colors">
                  View All Cars
                </Link>
              </li>
              <li>
                <Link href="/brands" className="text-gray-400 hover:text-white transition-colors">
                  Our Brands
                </Link>
              </li>
              <li>
                <Link href="/dealerships" className="text-gray-400 hover:text-white transition-colors">
                  Locations
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-2 text-gray-400">
              <p>Premium Automotive Excellence</p>
              <p>Powered by Cosmic CMS</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Elite Sports Cars. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}