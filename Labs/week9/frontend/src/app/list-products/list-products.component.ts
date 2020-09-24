import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProductDataService } from '../product-data.service';
import { Products } from '../products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  products: Products[] = [];

  constructor(private productdata:ProductDataService, private router:Router, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle( 'Products' );
    this.productdata.getList().subscribe( (data) => {
      this.products = data;
    })
  }

  deleteProduct(id) {
    if ( confirm("Delete this item?")) {
      this.productdata.remove(id).subscribe( (data) => {
        this.products = data;
      });
    }
  }
}
