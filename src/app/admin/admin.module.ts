import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AddPageComponent } from './add-page/add-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../shared/guards/auth.guard';
import { LoginGuard } from '../shared/guards/login.guard';
import { QuillModule } from 'ngx-quill';

const adminRoutes: Routes = [
  {
    path: '',
    redirectTo: '/admin/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add',
    component: AddPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'product/:id/edit',
    component: EditPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'orders',
    component: OrdersPageComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, QuillModule.forRoot(), RouterModule.forChild([
    {
      path: '',
      component: AdminLayoutComponent,
      children: adminRoutes
    }
  ])],
  exports: [RouterModule],
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    AddPageComponent,
    DashboardPageComponent,
    EditPageComponent,
    OrdersPageComponent
  ]
})
export class AdminModule { }