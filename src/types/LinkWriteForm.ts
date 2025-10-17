export interface Product {
  name: string;
  url: string;
  description?: string;
  imageFile?: File; 
  imageUrl?: string; 
}

export interface ProductForm {
  products: Product[];
}
