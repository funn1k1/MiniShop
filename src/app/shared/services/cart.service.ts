import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/Product';

@Injectable()
export class CartService {
  products$ = new BehaviorSubject<Product[]>(JSON.parse(localStorage.getItem("products")) ?? []);
  products: Product[] = JSON.parse(localStorage.getItem("products")) ?? [];

  constructor() { }

  addToCart(product: Product) {
    this.products.push(product);
    localStorage.setItem("products", JSON.stringify(this.products));
    this.products$.next(JSON.parse(localStorage.getItem("products")));
  }

  remove(product: Product) {
    this.products.splice(this.products.indexOf(product), 1);
    localStorage.setItem("products", JSON.stringify(this.products));
    this.products$.next(JSON.parse(localStorage.getItem("products")));
  }
}
