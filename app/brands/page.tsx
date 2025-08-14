import { Suspense } from 'react';
import Link from 'next/link';
import { cosmic } from '@/lib/cosmic';
import type { Brand } from '@/types';

async function getBrands(): Promise<Brand[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'brands' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return objects as Brand[];
  } catch (error) {
    console.error('Error fetching brands:', error);
    return [];
  }
}

function BrandGrid({ brands }: { brands: Brand[] }) {
  if (brands.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No brands available</h3>
        <p className="text-gray-500">Check back soon for more brands.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {brands.map((brand) => (
        <Link key={brand.id} href={`/brands/${brand.slug}`} className="group">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            {brand.metadata.brand_logo && (
              <div className="relative h-32 bg-gray-50 flex items-center justify-center p-6">
                <img
                  src={`${brand.metadata.brand_logo.imgix_url}?w=400&h=200&fit=max&auto=format,compress`}
                  alt={`${brand.metadata.brand_name} logo`}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                {brand.metadata.brand_name}
              </h3>
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                {brand.metadata.country && (
                  <span>{brand.metadata.country}</span>
                )}
                {brand.metadata.founded_year && (
                  <span>Founded {brand.metadata.founded_year}</span>
                )}
              </div>
              {brand.metadata.description && (
                <div 
                  className="text-gray-600 text-sm line-clamp-3"
                  dangerouslySetInnerHTML={{ 
                    __html: brand.metadata.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
                  }}
                />
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function BrandsPageSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="h-32 bg-gray-200 animate-pulse"></div>
          <div className="p-6">
            <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Luxury Car Brands
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore the world's most prestigious automotive brands and discover their rich heritage and exceptional craftsmanship.
          </p>
        </div>

        <Suspense fallback={<BrandsPageSkeleton />}>
          <BrandGrid brands={brands} />
        </Suspense>
      </div>
    </div>
  );
}