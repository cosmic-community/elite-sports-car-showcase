import { Brand } from '@/types'
import Link from 'next/link'

interface BrandShowcaseProps {
  brands: Brand[]
}

export default function BrandShowcase({ brands }: BrandShowcaseProps) {
  if (!brands || brands.length === 0) {
    return null
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gradient mb-4">
          Prestigious Brands
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore legendary automotive manufacturers known for their heritage and excellence
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {brands.map((brand, index) => (
          <Link 
            key={brand.id}
            href={`/brands/${brand.slug}`}
            className={`group animate-slide-up`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
              {/* Brand Logo */}
              <div className="text-center mb-6">
                {brand.metadata?.brand_logo?.imgix_url ? (
                  <img
                    src={`${brand.metadata.brand_logo.imgix_url}?w=200&h=200&fit=contain&auto=format,compress`}
                    alt={`${brand.metadata.brand_name} logo`}
                    className="w-24 h-24 mx-auto object-contain"
                  />
                ) : (
                  <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-400">
                      {brand.metadata?.brand_name?.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Brand Info */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {brand.metadata?.brand_name}
                </h3>
                
                <div className="flex justify-center items-center space-x-4 text-sm text-gray-500 mb-4">
                  {brand.metadata?.country && (
                    <span>{brand.metadata.country}</span>
                  )}
                  {brand.metadata?.founded_year && (
                    <span>Est. {brand.metadata.founded_year}</span>
                  )}
                </div>
                
                {brand.metadata?.description && (
                  <div 
                    className="text-gray-600 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ 
                      __html: brand.metadata.description.substring(0, 150) + '...' 
                    }}
                  />
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}