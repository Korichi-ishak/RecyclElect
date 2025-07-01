// Types pour le projet RecyclElect

// Types pour les produits
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number | string;
  originalPrice?: number;
  images: string[];
  specifications: ProductSpecification[];
  warranty: string;
  condition: 'excellent' | 'bon' | 'moyen';
  stock: number;
  category: string;
  brand?: string;
  model?: string;
  createdAt: Date;
  imageUrl?: string;
  specs?: string;
  productType?: 'laptop' | 'part';
  avatar?: string; // URL de la photo de l'utilisateur
  title?: string;
  quote?: string;
}

export interface ProductSpecification {
  id: string;
  name: string;
  value: string;
}

// Types pour les modèles d'ordinateurs
export interface ComputerModel {
  id: string;
  name: string;
  brand: string;
  year: number;
  image: string;
  description: string;
  availableParts: string[]; // IDs des pièces disponibles
}

// Types pour les pièces de rechange
export interface Part extends Product {
  compatibleModels: string[]; // IDs des modèles compatibles
  partType: 'screen' | 'keyboard' | 'battery' | 'charger' | 'motherboard' | 'ram' | 'storage' | 'other';
}

// Types pour les formulaires
export interface SellFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  subject: string;
  description: string;
  reason: string;
  photos: File[];
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// Types pour le panier
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  shipping: ShippingOption;
}

// Types pour la livraison
export interface ShippingOption {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
  description: string;
}

// Types pour les témoignages
export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: Date;
  productType?: 'laptop' | 'part';
  avatar?: string; // URL de la photo de l'utilisateur
  title?: string;
  quote?: string;
}

// Types pour la navigation
export interface NavigationItem {
  label: string;
  path: string;
  icon?: string;
}

// Types pour les filtres
export interface ProductFilters {
  category?: 'laptop' | 'part';
  brand?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  condition?: 'excellent' | 'bon' | 'moyen';
  model?: string;
  policies: {
    returns: string;
    warranty: string;
    shipping: string;
  };
  videoUrl?: string;
  videoPoster?: string;
}

// Types pour les données de l'entreprise
export interface CompanyInfo {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  policies: {
    returns: string;
    warranty: string;
    shipping: string;
  };
  videoUrl?: string;
  videoPoster?: string;
} 