import { Suspense } from 'react';
import Link from 'next/link';
import { cosmic } from '@/lib/cosmic';
import type { Dealership } from '@/types';

async function getDealerships(): Promise<Dealership[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'dealerships' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return objects as Dealership[];
  } catch (error) {
    console.error('Error fetching dealerships:', error);
    return [];
  }
}

function DealershipGrid({ dealerships }: { dealerships: Dealership[] }) {
  if (dealerships.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No dealerships available</h3>
        <p className="text-gray-500">Check back soon for more locations.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {dealerships.map((dealership) => (
        <Link key={dealership.id} href={`/dealerships/${dealership.slug}`} className="group">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            {dealership.metadata.showroom_image && (
              <div className="relative h-48 overflow-hidden">
                <img
                  src={`${dealership.metadata.showroom_image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
                  alt={`${dealership.metadata.dealership_name} showroom`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                {dealership.metadata.dealership_name}
              </h3>
              
              <div className="space-y-2 mb-4">
                <p className="text-gray-600 whitespace-pre-line text-sm">
                  {dealership.metadata.address}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Phone:</span> {dealership.metadata.phone}
                </p>
                {dealership.metadata.email && (
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Email:</span> {dealership.metadata.email}
                  </p>
                )}
              </div>

              {dealership.metadata.manager_name && (
                <p className="text-sm text-gray-600 mb-4">
                  <span className="font-medium">Manager:</span> {dealership.metadata.manager_name}
                </p>
              )}

              {dealership.metadata.specializes_in && dealership.metadata.specializes_in.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Specializes in:</p>
                  <div className="flex flex-wrap gap-2">
                    {dealership.metadata.specializes_in.map((brand) => (
                      <span
                        key={brand.id}
                        className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full"
                      >
                        {brand.metadata?.brand_name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {dealership.metadata.hours && (
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-1">Hours:</p>
                  <p className="text-sm text-gray-600 whitespace-pre-line">
                    {dealership.metadata.hours}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function DealershipsPageSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="h-48 bg-gray-200 animate-pulse"></div>
          <div className="p-6">
            <div className="h-6 bg-gray-200 rounded animate-pulse mb-3"></div>
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function DealershipsPage() {
  const dealerships = await getDealerships();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Dealership Locations
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Visit our premium showrooms to experience our exclusive collection of luxury sports cars in person.
          </p>
        </div>

        <Suspense fallback={<DealershipsPageSkeleton />}>
          <DealershipGrid dealerships={dealerships} />
        </Suspense>
      </div>
    </div>
  );
}