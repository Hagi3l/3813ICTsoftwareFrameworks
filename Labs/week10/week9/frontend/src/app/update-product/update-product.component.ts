import { Component, Input, OnInit } from '@angular/core';
import { ProductDataService } from '../product-data.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

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
  product:[] = [];

  productname:string;
  productdesc:string;
  productprice:number;
  productunits:number;
  productid:number;

  updateProductMessage = "";
  noticeshow:boolean = false;

  constructor(private route: ActivatedRoute, private proddata:ProductDataService, private router:Router, private titleService: Title) { }

  get noticeName() {
    return this.noticeshow ? 'show':'hide';
  }

  ngOnInit() {
    this.titleService.setTitle( 'Update Product' );
    this.sub = this.route.params.subscribe(params => {
        this.id = params['id'];
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

  updateProduct() {
    let updateProd = {objid:this.id, name:this.productname, description:this.productdesc, price:this.productprice, units:this.productunits};
    console.log(updateProd);
    this.proddata.update(updateProd).subscribe( (data) => {
      this.noticeshow = true;
      if (data.err == null) {
        this.updateProductMessage = this.productname + " was updated";
      } else {
        this.updateProductMessage = data.err;
      }
      setTimeout( () => {
        this.router.navigate(['']);
      }, 2000);
    });
  }
}
