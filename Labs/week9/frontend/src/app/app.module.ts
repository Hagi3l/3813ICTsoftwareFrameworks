import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { ListProductsComponent } from './list-products/list-products.component';

import { ProductDataService } from './product-data.service';
import { AddProductsComponent } from './add-products/add-products.component';
import { UpdateProductComponent } from './update-product/update-product.component';

@NgModule({
  declarations: [
    AppComponent,
    ListProductsComponent,
    AddProductsComponent,
    UpdateProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    ProductDataService,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
