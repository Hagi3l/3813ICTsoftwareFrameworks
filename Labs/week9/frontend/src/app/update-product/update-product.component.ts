import { Component, Input, OnInit } from '@angular/core';
import { fromEventPattern } from 'rxjs';
import { ProductDataService } from '../product-data.service';
import { Products } from '../products';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  // @Input() routerLink: number;

  id: number;
  private sub: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      console.log(params);
      this.id = +params['id'];


   });
   console.log(this.id);
  }

}
