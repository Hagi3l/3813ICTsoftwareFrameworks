import { Component, Input, OnInit } from '@angular/core';
import { ProductDataService } from '../product-data.service';
import { Products } from '../products';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
  animations: [
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
export class UpdateProductComponent implements OnInit {

  id: number;
  private sub: any;
  product:Products[] = [];

  productname:string;
  productdesc:string;
  productprice:number;
  productunits:number;
  productid:number;

  // productobjid:string = "";
  // newprod: Products;
  // newProductMessage = "";
  noticeshow:boolean = false;

  constructor(private route: ActivatedRoute, private proddata:ProductDataService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];

      console.log(this.id);
      this.proddata.getItem(this.id).subscribe( (data) => {
        this.product = data;
        this.productname = data[0].name;
        this.productdesc = data[0].desc;
        this.productprice = data[0].price;
        this.productunits = data[0].units;
        this.productid = data[0].id;
      });

   });
  }

  updateProduct(event) {
    console.log('submitted a update event');
  }


}
