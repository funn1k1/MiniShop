import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/Product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  getSub: Subscription;
  remSub: Subscription;

  constructor(private prodServ: ProductService) { }

  ngOnInit(): void {
    this.getSub = this.prodServ.getAll().subscribe(p => {
      this.products = p
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
    this.remSub = this.prodServ.remove(id).subscribe(() => {
      this.products = this.products.filter(p => p.id !== id)
    });
  }
}
