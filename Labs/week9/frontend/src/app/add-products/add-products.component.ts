import { Component, OnInit } from '@angular/core';
import { fromEventPattern } from 'rxjs';
import { ProductDataService } from '../product-data.service';
import { Products } from '../products';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
  animations: [
    trigger('iderrorState', [
      state('show', style({
        opacity: 1,
        display: 'block'
      })),
      state('hide', style({
        opacity: 0,
        display: 'none'
      })),
      transition('show => hide', animate('1000ms ease-out')),
      transition('hide => show', animate('400ms ease-in')),
    ]),
    trigger('noticeState', [
      state('show', style({
        opacity: 1,
        display: 'block'
      })),
      state('hide', style({
        opacity: 0,
        display: 'none'
      })),
      transition('show => hide', animate('1000ms ease-out')),
      transition('hide => show', animate('400ms ease-in')),
    ])
  ]
})

export class AddProductsComponent implements OnInit {

  productname:string = "";
  productdesc:string = "";
  productprice:number = null;
  productunits:number = null;
  productid:number = null;
  productobjid:string = "";
  newprod: Products;
  newProductMessage = "";
  iderrormsg:string = "This ID already exists, please select a new one.";
  iderrormsg2:string = "";
  iderrorshow:boolean = false;
  noticeshow:boolean = false;

  constructor(private proddata:ProductDataService) { }

  ngOnInit(): void {
  }

  get stateName() {
    return this.iderrorshow ? 'show':'hide';
  }
  get noticeName() {
    return this.noticeshow ? 'show':'hide';
  }

  addNewProduct(event) {
    event.preventDefault();

    if (this.productid == null) {
      this.iderrorshow = !this.iderrorshow;
    } else {
      this.newprod = new Products("", this.productid, this.productname, this.productdesc, this.productprice, this.productunits);
      this.proddata.add(this.newprod).subscribe( (data) => {
        console.log(data);
        this.noticeshow = true;
        if (data.err == null) {
          this.newProductMessage = data.num + " new product (" + this.productname + ") was added";
        } else {
          this.newProductMessage = data.err;
        }
        this.productid = null;
        this.productname = "";
        this.productdesc = "";
        this.productprice = null;
        this.productunits = null;
      });
    }
  }

  checkValidId(event) {
    this.noticeshow = false;
    this.proddata.checkvalidid(event).subscribe( (data) => {
      if (data.success = 0) {
        this.iderrormsg2 = " Something above " + data.topnum;
        this.iderrorshow = !this.iderrorshow;
      } else {
        this.iderrorshow = false;
        this.iderrormsg2 = null;
      }
    });
  }
}
