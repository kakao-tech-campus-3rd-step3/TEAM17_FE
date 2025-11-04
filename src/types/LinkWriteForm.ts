export interface Product {
  name: string;
  linkUrl: string;
  description?: string;
  imageFile?: File; 
  imageUrl?: string; 
}

export interface ProductForm {
  products: Product[];
}
