import { Car, getCarPrice, getCarCondition, getBrandName } from '@/types'
import CarCard from '@/components/CarCard'

interface FeaturedCarsProps {
  cars: Car[]
}

export default function FeaturedCars({ cars }: FeaturedCarsProps) {
  if (!cars || cars.length === 0) {
    return null
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gradient mb-4">
          Featured Vehicles
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover our handpicked selection of the world's most exclusive sports cars
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car, index) => (
          <div 
            key={car.id}
            className={`animate-slide-up`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CarCard car={car} />
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <a
          href="/cars"
          className="inline-block bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
        >
          View All Vehicles
        </a>
      </div>
    </div>
  )
}