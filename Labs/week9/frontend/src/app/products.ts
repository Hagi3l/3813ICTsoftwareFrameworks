export class Products {

  id: number;
  name:string
  desc: string;
  price: number;
  units: number;

  constructor(productid:number, productname:string, productdesc:string, productprice:number, productunits:number) {
    this.id = productid;
    this.name = productname;
    this.desc = productdesc;
    this.price = productprice;
    this.units = productunits;
  }

}
