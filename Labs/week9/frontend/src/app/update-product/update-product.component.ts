import { Component, Input, OnInit } from '@angular/core';
import { fromEventPattern } from 'rxjs';
import { ProductDataService } from '../product-data.service';
import { Products } from '../products';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  // @Input() routerLink: number;

  constructor() { }

  ngOnInit(): void {
    // console.log(this.routerLink);
  }

}
