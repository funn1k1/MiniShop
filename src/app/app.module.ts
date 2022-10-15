import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { AuthService } from './shared/services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './shared/guards/auth.guard';
import { QuillConfigModule, QuillModule } from 'ngx-quill';
import { ProductService } from './shared/services/product.service';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { ProductComponent } from './product/product.component';
import { SortingPipe } from './shared/pipes/sorting.pipe';
import { CartService } from './shared/services/cart.service';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    MainPageComponent,
    ProductPageComponent,
    CartPageComponent,
    ProductComponent,
    SortingPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    QuillModule.forRoot()
  ],
  providers: [AuthService, ProductService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: AuthInterceptor
  }, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
