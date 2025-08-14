import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://imgix.cosmicjs.com/1131cfa0-795a-11f0-a051-23c10f41277a-photo-1544636331-e26879cd4d9b-1755208818925.jpg?w=2000&h=1200&fit=crop&auto=format,compress"
          alt="Luxury Porsche 911 Turbo S Sports Car"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          Elite Sports Cars
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-up animation-delay-150">
          Experience automotive excellence with the world's most prestigious brands
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-300">
          <Link 
            href="/cars"
            className="bg-luxury-gold hover:bg-yellow-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Explore Collection
          </Link>
          <Link 
            href="/dealerships"
            className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
          >
            Find Dealers
          </Link>
        </div>
      </div>
    </section>
  )
}