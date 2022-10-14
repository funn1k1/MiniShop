import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/Product';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(products: Product[], type: string = '') {
    return products.filter(p => p.type.toLowerCase() === type.toLowerCase());
  }

}
