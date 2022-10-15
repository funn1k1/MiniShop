import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Order } from '../interfaces/Order';

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) { }
  
  create(order: Order) {
    return this.http.post<any>(`${environment.fbDbUrl}/orders.json`, order).pipe(map((res) => ({
      id: res.name,
      ...order
    })));
  }

  // getAll() {
  //   return this.http.get<any>(`${environment.fbDbUrl}/products.json`).pipe(map(res => Object.keys(res).map(key => {
  //     return ({
  //       id: key,
  //       ...res[key]
  //     });
  //   })));
  // }
}
