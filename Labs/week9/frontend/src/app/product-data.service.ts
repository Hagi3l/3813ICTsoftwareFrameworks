import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products } from './products';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  constructor(private http:HttpClient) { }

  add(product:Products) {
    return this.http.post<any>('http://localhost:3000/api/add', product);
  }

  getList() {
    return this.http.get<any>('http://localhost:3000/api/getList');
  }

  getItem(productID) {
    return this.http.post<any>('http://localhost:3000/api/getList', { 'productid':productID });
  }

  update(product:Products) {
    return this.http.post<any>('http://localhost:3000/api/update', product );
  }

  delete(productID) {
    return this.http.post<any>('http://localhost:3000/api/delete', { 'productid':productID });
  }

  //TODO - check if valid product id.


}
