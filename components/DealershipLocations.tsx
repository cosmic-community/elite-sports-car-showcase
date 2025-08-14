import { Dealership, getBrandName } from '@/types'
import Link from 'next/link'

interface DealershipLocationsProps {
  dealerships: Dealership[]
}

export default function DealershipLocations({ dealerships }: DealershipLocationsProps) {
  if (!dealerships || dealerships.length === 0) {
    return null
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gradient mb-4">
          Our Locations
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Visit our premium showrooms across exclusive destinations
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {dealerships.map((dealership, index) => (
          <div 
            key={dealership.id}
            className={`bg-white rounded-lg shadow-lg overflow-hidden car-card-hover animate-slide-up`}
            style={{ animationDelay: `${index * 200}ms` }}
          >
            {/* Showroom Image */}
            <div className="relative h-48">
              {dealership.metadata?.showroom_image?.imgix_url ? (
                <img
                  src={`${dealership.metadata.showroom_image.imgix_url}?w=800&h=300&fit=crop&auto=format,compress`}
                  alt={`${dealership.metadata.dealership_name} showroom`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Showroom</span>
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            
            {/* Dealership Details */}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {dealership.metadata?.dealership_name}
              </h3>
              
              {/* Address */}
              {dealership.metadata?.address && (
                <div className="flex items-start space-x-2 text-gray-600 mb-3">
                  <svg className="w-5 h-5 mt-0.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="whitespace-pre-line">{dealership.metadata.address}</span>
                </div>
              )}
              
              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                {dealership.metadata?.phone && (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{dealership.metadata.phone}</span>
                  </div>
                )}
                
                {dealership.metadata?.manager_name && (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Manager: {dealership.metadata.manager_name}</span>
                  </div>
                )}
              </div>
              
              {/* Specialized Brands */}
              {dealership.metadata?.specializes_in && dealership.metadata.specializes_in.length > 0 && (
                <div className="mb-4">
                  <span className="text-sm text-gray-500 mb-2 block">Specializes in:</span>
                  <div className="flex flex-wrap gap-2">
                    {dealership.metadata.specializes_in.map((brand) => (
                      <span 
                        key={brand.id} 
                        className="px-3 py-1 bg-luxury-gold text-white text-sm rounded-full"
                      >
                        {getBrandName(brand)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Hours */}
              {dealership.metadata?.hours && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Hours:</span>
                  <div className="whitespace-pre-line mt-1">{dealership.metadata.hours}</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}