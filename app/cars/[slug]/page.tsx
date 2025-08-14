// app/cars/[slug]/page.tsx
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { cosmic } from '@/lib/cosmic';
import type { Car } from '@/types';

interface CarPageProps {
  params: Promise<{ slug: string }>;
}

async function getCar(slug: string): Promise<Car | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({ type: 'cars', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return object as Car;
  } catch (error) {
    console.error('Error fetching car:', error);
    return null;
  }
}

function CarGallery({ car }: { car: Car }) {
  const images = car.metadata.gallery_images || [];
  const mainImage = car.metadata.main_image;
  const allImages = mainImage ? [mainImage, ...images] : images;

  if (allImages.length === 0) {
    return (
      <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-xl flex items-center justify-center">
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
        <img
          src={`${allImages[0].imgix_url}?w=1200&h=675&fit=crop&auto=format,compress`}
          alt={car.title}
          className="w-full h-full object-cover"
        />
      </div>
      {allImages.length > 1 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {allImages.slice(1, 5).map((image, index) => (
            <div key={index} className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
              <img
                src={`${image.imgix_url}?w=400&h=300&fit=crop&auto=format,compress`}
                alt={`${car.title} - Image ${index + 2}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CarSpecs({ car }: { car: Car }) {
  const specs = [
    { label: 'Year', value: car.metadata.year?.toString() },
    { label: 'Engine', value: car.metadata.engine },
    { label: 'Horsepower', value: car.metadata.horsepower ? `${car.metadata.horsepower} HP` : undefined },
    { label: '0-60 mph', value: car.metadata.acceleration },
    { label: 'Top Speed', value: car.metadata.top_speed },
    { label: 'Exterior Color', value: car.metadata.exterior_color },
    { label: 'Interior Color', value: car.metadata.interior_color },
    { label: 'Mileage', value: car.metadata.mileage ? `${car.metadata.mileage.toLocaleString()} miles` : undefined },
    { label: 'Condition', value: car.metadata.condition?.value },
  ].filter(spec => spec.value);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Specifications</h3>
      <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {specs.map((spec) => (
          <div key={spec.label} className="border-b border-gray-200 pb-2">
            <dt className="text-sm font-medium text-gray-600">{spec.label}</dt>
            <dd className="text-base text-gray-900 mt-1">{spec.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function DealershipInfo({ car }: { car: Car }) {
  const dealership = car.metadata.dealership;

  if (!dealership) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Available At</h3>
      <Link 
        href={`/dealerships/${dealership.slug}`}
        className="block hover:bg-gray-50 rounded-lg p-4 transition-colors border border-gray-200"
      >
        <h4 className="text-lg font-semibold text-indigo-600 mb-2">
          {dealership.metadata.dealership_name}
        </h4>
        <p className="text-gray-600 mb-2 whitespace-pre-line">
          {dealership.metadata.address}
        </p>
        <p className="text-gray-600 mb-1">
          <span className="font-medium">Phone:</span> {dealership.metadata.phone}
        </p>
        {dealership.metadata.email && (
          <p className="text-gray-600">
            <span className="font-medium">Email:</span> {dealership.metadata.email}
          </p>
        )}
      </Link>
    </div>
  );
}

export default async function CarPage({ params }: CarPageProps) {
  const { slug } = await params;
  const car = await getCar(slug);

  if (!car) {
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
            <li><Link href="/cars" className="hover:text-indigo-600">Cars</Link></li>
            <li>/</li>
            <li className="text-gray-900">{car.title}</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{car.title}</h1>
              <div className="flex items-center space-x-4">
                <Link 
                  href={`/brands/${car.metadata.brand?.slug}`}
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  {car.metadata.brand?.metadata?.brand_name}
                </Link>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  car.metadata.condition.key === 'new' 
                    ? 'bg-green-100 text-green-800' 
                    : car.metadata.condition.key === 'certified'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {car.metadata.condition.value}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  car.metadata.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {car.metadata.available ? 'Available' : 'Sold'}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-indigo-600">
                ${car.metadata.price.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <Suspense fallback={<div className="h-96 bg-gray-200 rounded-xl animate-pulse"></div>}>
              <CarGallery car={car} />
            </Suspense>

            {car.metadata.description && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
                <div 
                  className="prose prose-gray max-w-none"
                  dangerouslySetInnerHTML={{ __html: car.metadata.description }}
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <CarSpecs car={car} />
            <DealershipInfo car={car} />
            
            {car.metadata.available && (
              <div className="bg-indigo-600 text-white rounded-xl p-6 text-center">
                <h3 className="text-lg font-bold mb-2">Interested in this car?</h3>
                <p className="text-indigo-100 mb-4">Contact our team to schedule a test drive or get more information.</p>
                <a
                  href={`tel:${car.metadata.dealership?.metadata?.phone}`}
                  className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
                >
                  Call Now
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}