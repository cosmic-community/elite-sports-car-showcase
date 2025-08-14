import Hero from '@/components/Hero'
import FeaturedCars from '@/components/FeaturedCars'
import BrandShowcase from '@/components/BrandShowcase'
import DealershipLocations from '@/components/DealershipLocations'
import { getAvailableCars, getBrands, getDealerships } from '@/lib/cosmic'

export default async function HomePage() {
  // Fetch data in parallel for better performance
  const [cars, brands, dealerships] = await Promise.all([
    getAvailableCars(),
    getBrands(),
    getDealerships()
  ])

  return (
    <div className="space-y-16">
      <Hero />
      
      {cars.length > 0 && (
        <section id="featured-cars" className="py-16 bg-gray-50">
          <FeaturedCars cars={cars.slice(0, 6)} />
        </section>
      )}

      {brands.length > 0 && (
        <section id="brands" className="py-16">
          <BrandShowcase brands={brands} />
        </section>
      )}

      {dealerships.length > 0 && (
        <section id="dealerships" className="py-16 bg-gray-50">
          <DealershipLocations dealerships={dealerships} />
        </section>
      )}
    </div>
  )
}