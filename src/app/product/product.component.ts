import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../shared/interfaces/Product';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;

  constructor(private cartServ: CartService) { }

  ngOnInit(): void {
  }

  addProduct(product: Product) {
    this.cartServ.addToCart(product);
  }
}
