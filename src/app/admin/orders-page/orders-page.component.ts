import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/shared/interfaces/Order';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {
  orders: Order[] = [];
  getSub: Subscription;
  remSub: Subscription;

  constructor(private orderServ: OrderService) { }

  ngOnInit(): void {
    this.getSub = this.orderServ.getAll().subscribe(o => {
      this.orders = o;
    });
  }

  ngOnDestroy(): void {
    if (this.getSub) {
      this.getSub.unsubscribe();
    }
    if (this.remSub) {
      this.remSub.unsubscribe();
    }
  }

  remove(id: string) {
    this.remSub = this.orderServ.remove(id).subscribe(() => {
      this.orders = this.orders.filter(o => o.id !== id);
    });
  }
}
