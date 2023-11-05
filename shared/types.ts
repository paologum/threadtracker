export interface Brand {
  brandID: number;
  name: string;
  creator: string;
  startingDate: number;
  luxury: string;
  rating: number;
  // Other properties...
}
export interface Product {
  productID: number;
  dropID: number;
  brandID: number;
  name: string;
  price: number;
  material: string;
  category: string;
  color: string;
}