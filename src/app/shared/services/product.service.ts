import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/Product';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) { }

  create(prod: Product) {
    return this.http.post<any>(`${environment.fbDbUrl}/products.json`, prod).pipe(map((val) => ({
      id: val.name,
      ...prod
    })));
  }
}
