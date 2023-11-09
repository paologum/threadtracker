export interface Brand {
  brandID: number;
  name: string;
  creator: string;
  year: number;
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
export interface Drop {
  dropID: number,
  brandID: number,
  name: string,
  date: string,
  season: string,
  collaboratorID: number
}