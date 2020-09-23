import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListProductsComponent } from './list-products/list-products.component';
import { AddProductsComponent } from './add-products/add-products.component';

const routes: Routes = [

  {path: '', component: ListProductsComponent},
  {path: 'add', component: AddProductsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
