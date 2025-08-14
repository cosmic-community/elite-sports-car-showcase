import { createBucketClient } from '@cosmicjs/sdk'
import { Car, Brand, Dealership, CosmicResponse } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all cars with relationships
export async function getCars(): Promise<Car[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'cars' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Car[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch cars');
  }
}

// Fetch available cars only
export async function getAvailableCars(): Promise<Car[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'cars',
        'metadata.available': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Car[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch available cars');
  }
}

// Fetch single car by slug
export async function getCar(slug: string): Promise<Car | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'cars',
        slug
      })
      .depth(1);
    
    return response.object as Car;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch car: ${slug}`);
  }
}

// Fetch all brands
export async function getBrands(): Promise<Brand[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'brands' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects as Brand[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch brands');
  }
}

// Fetch single brand by slug
export async function getBrand(slug: string): Promise<Brand | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'brands',
        slug
      });
    
    return response.object as Brand;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch brand: ${slug}`);
  }
}

// Fetch all dealerships with relationships
export async function getDealerships(): Promise<Dealership[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'dealerships' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Dealership[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch dealerships');
  }
}

// Fetch single dealership by slug
export async function getDealership(slug: string): Promise<Dealership | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'dealerships',
        slug
      })
      .depth(1);
    
    return response.object as Dealership;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch dealership: ${slug}`);
  }
}

// Fetch cars by brand
export async function getCarsByBrand(brandId: string): Promise<Car[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'cars',
        'metadata.brand': brandId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Car[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error(`Failed to fetch cars for brand: ${brandId}`);
  }
}

// Fetch cars by dealership
export async function getCarsByDealership(dealershipId: string): Promise<Car[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'cars',
        'metadata.dealership': dealershipId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Car[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error(`Failed to fetch cars for dealership: ${dealershipId}`);
  }
}