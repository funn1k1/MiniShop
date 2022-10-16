import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Order } from '../shared/interfaces/Order';
import { Product } from '../shared/interfaces/Product';
import { CartService } from '../shared/services/cart.service';
import { OrderService } from '../shared/services/order.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cartProducts: Product[] = [];
  totalPrice = 0;
  submitted = false;
  form: FormGroup;
  status = '';

  constructor(private cartServ: CartService, private orderServ: OrderService) { }

  ngOnInit(): void {
    this.cartServ.products$.subscribe(p => {
      this.totalPrice = 0;
      this.cartProducts = p;
      this.cartProducts.forEach(p => {
        this.totalPrice += p.price;
      });
    });
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      payment: new FormControl("Cash")
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    const order: Order = {
      products: this.cartProducts,
      name: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
      payment: this.form.value.payment,
      price: this.totalPrice,
      date: new Date()
    };
    console.log(this.form);
    this.orderServ.create(order).subscribe(_ => {
      this.form.reset();
      this.submitted = false;
      this.status = 'Delivery is arranged';
    })
  }

  removeProduct(product: Product) {
    this.cartServ.remove(product);
  }
}
