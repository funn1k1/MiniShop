import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/Product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: Product[], productName: string = '') {
    if (!productName.trim()) {
      return products;
    } else {
      return products.filter(p => p.name.toLowerCase().includes(productName.toLowerCase()));
    }
  }

}
