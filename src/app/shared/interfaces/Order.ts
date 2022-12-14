import { Product } from './Product';

export interface Order {
  id?: string;
  products: Product[], 
  name: string;
  phone: string;
  address: string;
  payment: string;
  price: number;
  date: Date;
}