import Link from 'next/link'
import { Car, getCarPrice, getCarCondition, getBrandName } from '@/types'

interface CarCardProps {
  car: Car
}

export default function CarCard({ car }: CarCardProps) {
  const imageUrl = car.metadata?.main_image?.imgix_url
  const brandName = getBrandName(car.metadata?.brand)
  const price = getCarPrice(car)
  const condition = getCarCondition(car)

  return (
    <Link href={`/cars/${car.slug}`}>
      <div className="car-card-hover bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Car Image */}
        <div className="relative h-64 overflow-hidden">
          {imageUrl ? (
            <img
              src={`${imageUrl}?w=800&h=400&fit=crop&auto=format,compress`}
              alt={car.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
          
          {/* Condition Badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              car.metadata?.condition?.key === 'new' 
                ? 'bg-green-100 text-green-800'
                : car.metadata?.condition?.key === 'certified'
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {condition}
            </span>
          </div>
          
          {/* Availability Badge */}
          {car.metadata?.available && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-luxury-gold text-white">
                Available
              </span>
            </div>
          )}
        </div>
        
        {/* Car Details */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">{brandName}</span>
            <span className="text-sm text-gray-500">{car.metadata?.year}</span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">{car.title}</h3>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-luxury-gold">{price}</span>
            {car.metadata?.mileage !== undefined && (
              <span className="text-sm text-gray-500">
                {car.metadata.mileage.toLocaleString()} miles
              </span>
            )}
          </div>
          
          {/* Performance Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            {car.metadata?.horsepower && (
              <div>
                <span className="text-gray-500">Power:</span>
                <span className="font-semibold ml-1">{car.metadata.horsepower} HP</span>
              </div>
            )}
            {car.metadata?.acceleration && (
              <div>
                <span className="text-gray-500">0-60:</span>
                <span className="font-semibold ml-1">{car.metadata.acceleration}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}