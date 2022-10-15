import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../shared/interfaces/Product';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cartProducts: Product[] = [];
  totalPrice = 0;

  constructor(private cartServ: CartService) { }

  ngOnInit(): void {
    this.cartServ.products$.subscribe(p => this.cartProducts = p);
    this.cartProducts.forEach(p => {
      this.totalPrice += p.price;
    });
  }

  removeProduct(id: string) {
    this.cartServ.remove(id);
  }
}
