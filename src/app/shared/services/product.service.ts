import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/Product';

@Injectable()
export class ProductService {
  type: string;

  constructor(private http: HttpClient) { }

  create(prod: Product) {
    return this.http.post<any>(`${environment.fbDbUrl}/products.json`, prod).pipe(map((res) => ({
      id: res.name,
      ...prod
    })));
  }

  getAll() {
    return this.http.get<any>(`${environment.fbDbUrl}/products.json`).pipe(map(res => Object.keys(res).map(key => {
      return ({
        id: key,
        ...res[key]
      });
    })));
  }

  getById(id: string) {
    return this.http.get<Product>(`${environment.fbDbUrl}/products/${id}.json`);
  }

  remove(id: string) {
    return this.http.delete(`${environment.fbDbUrl}/products/${id}.json`)
  }

  update(prod: Product) {
    return this.http.patch(`${environment.fbDbUrl}/products/${prod.id}.json`, prod);
  }

  setType(type: string) {
    this.type = type;
  }
}
