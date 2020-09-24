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
    return this.http.post<any>('http://localhost:3000/api/getItem', { 'productid':productID });
  }

  update(product) {
    return this.http.post<any>('http://localhost:3000/api/update', product );
  }

  remove(productID) {
    console.log(productID);
    return this.http.post<any>('http://localhost:3000/api/remove', { 'productid':productID });
  }

  checkvalidid(productID) {
    return this.http.post<any>('http://localhost:3000/api/checkID', { 'productid':productID });
  }
}
