// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status?: string;
  thumbnail?: string;
  published_at?: string;
}

// Car object interface
export interface Car extends CosmicObject {
  type: 'cars';
  metadata: {
    model_name: string;
    year: number;
    price: number;
    description?: string;
    engine?: string;
    horsepower?: number;
    acceleration?: string;
    top_speed?: string;
    exterior_color?: string;
    interior_color?: string;
    mileage?: number;
    condition: {
      key: CarCondition;
      value: string;
    };
    main_image?: {
      url: string;
      imgix_url: string;
    };
    gallery_images?: Array<{
      url: string;
      imgix_url: string;
    }>;
    brand: Brand;
    dealership: Dealership;
    available: boolean;
  };
}

// Brand object interface  
export interface Brand extends CosmicObject {
  type: 'brands';
  metadata: {
    brand_name: string;
    country?: string;
    founded_year?: number;
    description?: string;
    brand_logo?: {
      url: string;
      imgix_url: string;
    };
    website?: string;
  };
}

// Dealership object interface
export interface Dealership extends CosmicObject {
  type: 'dealerships';
  metadata: {
    dealership_name: string;
    address: string;
    phone: string;
    email?: string;
    manager_name?: string;
    hours?: string;
    showroom_image?: {
      url: string;
      imgix_url: string;
    };
    specializes_in?: Brand[];
  };
}

// Type literals
export type CarCondition = 'new' | 'used' | 'certified';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Utility types
export type CarWithRelations = Car;
export type DealershipWithBrands = Dealership;

// Type guards
export function isCar(obj: CosmicObject): obj is Car {
  return obj.type === 'cars';
}

export function isBrand(obj: CosmicObject): obj is Brand {
  return obj.type === 'brands';
}

export function isDealership(obj: CosmicObject): obj is Dealership {
  return obj.type === 'dealerships';
}

// Helper functions for safe property access
export function getCarPrice(car: Car): string {
  return car.metadata.price ? `$${car.metadata.price.toLocaleString()}` : 'Price on request';
}

export function getCarCondition(car: Car): string {
  return car.metadata.condition?.value || 'Condition not specified';
}

export function getBrandName(brand?: Brand): string {
  return brand?.metadata?.brand_name || 'Unknown Brand';
}

export function getDealershipName(dealership?: Dealership): string {
  return dealership?.metadata?.dealership_name || 'Unknown Dealership';
}