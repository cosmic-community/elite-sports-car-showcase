// app/dealerships/[slug]/page.tsx
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { cosmic } from '@/lib/cosmic';
import type { Dealership, Car } from '@/types';

interface DealershipPageProps {
  params: Promise<{ slug: string }>;
}

async function getDealership(slug: string): Promise<Dealership | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({ type: 'dealerships', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return object as Dealership;
  } catch (error) {
    console.error('Error fetching dealership:', error);
    return null;
  }
}

async function getDealershipCars(dealershipId: string): Promise<Car[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'cars', 'metadata.dealership': dealershipId })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return objects as Car[];
  } catch (error) {
    console.error('Error fetching dealership cars:', error);
    return [];
  }
}

function DealershipHeader({ dealership }: { dealership: Dealership }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
      {dealership.metadata.showroom_image && (
        <div className="h-64 md:h-80 relative">
          <img
            src={`${dealership.metadata.showroom_image.imgix_url}?w=1200&h=400&fit=crop&auto=format,compress`}
            alt={`${dealership.metadata.dealership_name} showroom`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div className="p-8 text-white">
              <h1 className="text-4xl font-bold mb-2">
                {dealership.metadata.dealership_name}
              </h1>
            </div>
          </div>
        </div>
      )}
      
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium text-gray-700">Address</h3>
                <p className="text-gray-600 whitespace-pre-line">
                  {dealership.metadata.address}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Phone</h3>
                <a 
                  href={`tel:${dealership.metadata.phone}`}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  {dealership.metadata.phone}
                </a>
              </div>
              {dealership.metadata.email && (
                <div>
                  <h3 className="font-medium text-gray-700">Email</h3>
                  <a 
                    href={`mailto:${dealership.metadata.email}`}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    {dealership.metadata.email}
                  </a>
                </div>
              )}
              {dealership.metadata.manager_name && (
                <div>
                  <h3 className="font-medium text-gray-700">Manager</h3>
                  <p className="text-gray-600">{dealership.metadata.manager_name}</p>
                </div>
              )}
            </div>
          </div>

          {/* Hours and Specialties */}
          <div>
            {dealership.metadata.hours && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Hours of Operation</h2>
                <p className="text-gray-600 whitespace-pre-line">
                  {dealership.metadata.hours}
                </p>
              </div>
            )}

            {dealership.metadata.specializes_in && dealership.metadata.specializes_in.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Specializes In</h2>
                <div className="grid grid-cols-1 gap-3">
                  {dealership.metadata.specializes_in.map((brand) => (
                    <Link
                      key={brand.id}
                      href={`/brands/${brand.slug}`}
                      className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {brand.metadata?.brand_logo && (
                        <img
                          src={`${brand.metadata.brand_logo.imgix_url}?w=100&h=50&fit=max&auto=format,compress`}
                          alt={`${brand.metadata.brand_name} logo`}
                          className="w-12 h-6 object-contain mr-3"
                        />
                      )}
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {brand.metadata?.brand_name}
                        </h3>
                        {brand.metadata?.country && (
                          <p className="text-sm text-gray-500">{brand.metadata.country}</p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DealershipCars({ cars, dealershipName }: { cars: Car[]; dealershipName: string }) {
  if (cars.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Current Inventory</h2>
        <p className="text-gray-600">No vehicles are currently available at this location.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Current Inventory at {dealershipName} ({cars.length} {cars.length === 1 ? 'vehicle' : 'vehicles'})
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <Link key={car.id} href={`/cars/${car.slug}`} className="group">
            <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
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
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {car.title}
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-indigo-600">
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
    </div>
  );
}

export default async function DealershipPage({ params }: DealershipPageProps) {
  const { slug } = await params;
  const [dealership, cars] = await Promise.all([
    getDealership(slug),
    getDealership(slug).then(dealershipData => 
      dealershipData ? getDealershipCars(dealershipData.id) : []
    )
  ]);

  if (!dealership) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-indigo-600">Home</Link></li>
            <li>/</li>
            <li><Link href="/dealerships" className="hover:text-indigo-600">Dealerships</Link></li>
            <li>/</li>
            <li className="text-gray-900">{dealership.metadata.dealership_name}</li>
          </ol>
        </nav>

        <DealershipHeader dealership={dealership} />

        <Suspense fallback={<div className="h-96 bg-gray-200 rounded-xl animate-pulse"></div>}>
          <DealershipCars 
            cars={cars} 
            dealershipName={dealership.metadata.dealership_name} 
          />
        </Suspense>
      </div>
    </div>
  );
}