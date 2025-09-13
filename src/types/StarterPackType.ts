export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface StarterPack {
  id: string;
  name: string;
  description: string;
  mainImage: string;
  originalPrice: number;
  salePrice: number;
  discountRate: number;
  products: Product[];
  rating: number;
  reviewCount: number;
  category: string;
}
