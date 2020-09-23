import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListProductsComponent } from './list-products/list-products.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { UpdateProductComponent } from './update-product/update-product.component';

const routes: Routes = [

  {path: '', component: ListProductsComponent},
  {path: 'add', component: AddProductsComponent},
  {path: 'update', component: UpdateProductComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
