export type ProductForm = {
  products: {
    name: string;
    url: string;
    description: string;
    image: FileList | null;
  }[];
};
