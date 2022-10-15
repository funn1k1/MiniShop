import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from '../shared/interfaces/Product';
import { CartService } from '../shared/services/cart.service';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  product$: Observable<Product>;

  constructor(private prodServ: ProductService, private cartServ: CartService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.product$ = this.activeRoute.params.pipe(switchMap(params => this.prodServ.getById(params['id'])));
  }

  addProduct(product: Product) {
    this.cartServ.addToCart(product);
  }
}
