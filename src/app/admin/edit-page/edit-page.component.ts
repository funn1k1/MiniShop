import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/Product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  product: Product;
  form: FormGroup;
  submitted = false;

  constructor(private activeRoute: ActivatedRoute, private prodServ: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.activeRoute.params.pipe(switchMap(params => {
      return this.prodServ.getById(params['id']);
    })).subscribe(p => {
      this.product = p;
      this.form = new FormGroup({
        type: new FormControl(this.product.type, Validators.required),
        name: new FormControl(this.product.name, Validators.required),
        image: new FormControl(this.product.image, Validators.required),
        description: new FormControl(this.product.description, Validators.required),
        price: new FormControl(this.product.price, Validators.required),
      });
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    const newProd: Product = {
      id: this.product.id,
      type: this.form.value.type,
      name: this.form.value.name,
      image: this.form.value.image,
      description: this.form.value.description,
      price: this.form.value.price,
      date: new Date()
    }
    this.prodServ.update(newProd).subscribe(() => {
      this.router.navigate(['/admin', 'dashboard']);
      this.submitted = false;
    });
  }
}
