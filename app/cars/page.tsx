import { Suspense } from 'react';
import Link from 'next/link';
import { cosmic } from '@/lib/cosmic';
import type { Car } from '@/types';

async function getCars(): Promise<Car[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'cars' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return objects as Car[];
  } catch (error) {
    console.error('Error fetching cars:', error);
    return [];
  }
}

function CarGrid({ cars }: { cars: Car[] }) {
  if (cars.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No cars available</h3>
        <p className="text-gray-500">Check back soon for new inventory.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {cars.map((car) => (
        <Link key={car.id} href={`/cars/${car.slug}`} className="group">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            {car.metadata.main_image && (
              <div className="relative h-48 overflow-hidden">
                <img
                  src={`${car.metadata.main_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                  alt={car.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    car.metadata.condition.key === 'new' 
                      ? 'bg-green-100 text-green-800' 
                      : car.metadata.condition.key === 'certified'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {car.metadata.condition.value}
                  </span>
                </div>
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  {car.metadata.year}
                </span>
                <span className="text-sm font-medium text-indigo-600">
                  {car.metadata.brand?.metadata?.brand_name}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                {car.title}
              </h3>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-indigo-600">
                  ${car.metadata.price.toLocaleString()}
                </span>
                {car.metadata.mileage && (
                  <span className="text-sm text-gray-500">
                    {car.metadata.mileage.toLocaleString()} miles
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{car.metadata.engine}</span>
                {car.metadata.horsepower && (
                  <span>{car.metadata.horsepower} HP</span>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function CarsPageSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="h-48 bg-gray-200 animate-pulse"></div>
          <div className="p-6">
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function CarsPage() {
  const cars = await getCars();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Car Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our exclusive selection of premium sports cars from the world's most prestigious manufacturers.
          </p>
        </div>

        <Suspense fallback={<CarsPageSkeleton />}>
          <CarGrid cars={cars} />
        </Suspense>
      </div>
    </div>
  );
}