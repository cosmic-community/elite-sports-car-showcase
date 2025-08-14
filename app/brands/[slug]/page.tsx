// app/brands/[slug]/page.tsx
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { cosmic } from '@/lib/cosmic';
import type { Brand, Car } from '@/types';

interface BrandPageProps {
  params: Promise<{ slug: string }>;
}

async function getBrand(slug: string): Promise<Brand | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({ type: 'brands', slug })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return object as Brand;
  } catch (error) {
    console.error('Error fetching brand:', error);
    return null;
  }
}

async function getBrandCars(brandId: string): Promise<Car[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'cars', 'metadata.brand': brandId })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return objects as Car[];
  } catch (error) {
    console.error('Error fetching brand cars:', error);
    return [];
  }
}

function BrandHeader({ brand }: { brand: Brand }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        {brand.metadata.brand_logo && (
          <div className="flex-shrink-0">
            <img
              src={`${brand.metadata.brand_logo.imgix_url}?w=200&h=100&fit=max&auto=format,compress`}
              alt={`${brand.metadata.brand_name} logo`}
              className="h-16 md:h-20 object-contain"
            />
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {brand.metadata.brand_name}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
            {brand.metadata.country && (
              <span className="flex items-center">
                <span className="font-medium">Country:</span> {brand.metadata.country}
              </span>
            )}
            {brand.metadata.founded_year && (
              <span className="flex items-center">
                <span className="font-medium">Founded:</span> {brand.metadata.founded_year}
              </span>
            )}
            {brand.metadata.website && (
              <a
                href={brand.metadata.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Visit Website →
              </a>
            )}
          </div>
          {brand.metadata.description && (
            <div 
              className="prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: brand.metadata.description }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function BrandCars({ cars }: { cars: Car[] }) {
  if (cars.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No cars available</h3>
        <p className="text-gray-500">No vehicles from this brand are currently in our inventory.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Available {cars[0]?.metadata?.brand?.metadata?.brand_name} Vehicles ({cars.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  );
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = await params;
  const [brand, cars] = await Promise.all([
    getBrand(slug),
    getBrand(slug).then(brandData => 
      brandData ? getBrandCars(brandData.id) : []
    )
  ]);

  if (!brand) {
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
            <li><Link href="/brands" className="hover:text-indigo-600">Brands</Link></li>
            <li>/</li>
            <li className="text-gray-900">{brand.metadata.brand_name}</li>
          </ol>
        </nav>

        <BrandHeader brand={brand} />

        <Suspense fallback={<div className="h-96 bg-gray-200 rounded-xl animate-pulse"></div>}>
          <BrandCars cars={cars} />
        </Suspense>
      </div>
    </div>
  );
}