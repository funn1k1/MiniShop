import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/Product';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  modules = {};

  constructor(private productServ: ProductService, private router: Router) {
    this.modules = {
      'toolbar': [
        ['image']
      ]
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      type: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    const product: Product = {
      type: this.form.value.type,
      name: this.form.value.name,
      image: this.form.value.image,
      description: this.form.value.description,
      price: this.form.value.price,
      date: new Date()
    };
    this.productServ.create(product).subscribe(res => {
      console.log(res);
      this.submitted = false;
      this.router.navigate(['/'])
    });
  }
}
