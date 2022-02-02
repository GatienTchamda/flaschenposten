import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: any = [];
  items: any;
  


  constructor(public productServ: ProductService, private route: ActivatedRoute,private router : Router) { }

  ngOnInit() {
    this.getProducts();
  }
  getProducts(){
    this.products = [];
    this.productServ.getProducts().subscribe((data:any)=>{
      this.products = data;
      console.log(this.products);
    });
  }  

  isAscendic = true

  //Sortieren nach Preis
  sortData(){
    if(this.isAscendic){
      this.ascendic()
    } else {
      this.descendic()
    }
   }

  protected get numericBottle() {
    return this.products.map((i: any) => (i));
  }
  ascendic(){
    this.isAscendic = false;
     this.products = this.numericBottle.sort((a1: any,a2: any) => {
       console.log(a1.articles[0].price);
       
        if (a1.articles[0].price < a2.articles[0].price) {
            return 1;
        }
        if (a1.articles[0].price > a2.articles[0].price) {
            return -1;
        }
        return 0;
    });
  }
  descendic(){
    this.isAscendic = true
  this.products = this.numericBottle.sort((a1: any,a2: any):number => {
    
    if (a1.articles[0].price > a2.articles[0].price) {
        return 1;
    }
    if (a1.articles[0].price < a2.articles[0].price) {
        return -1;
    }
    return 0;
  });
    
  }
  //DAta Filtern
  filterData(){
    this.products = this.numericBottle.filter((a1: any) => {
      const par = (a1.articles[0].pricePerUnitText).replace('(','');
      const per = par.replace(')','');
      const ergebnis = parseFloat(per)
      if (ergebnis >= 2) 
      {
        console.log(ergebnis);
        
        return 1 ;
      }    
      return 0;
    });
  }
  ViewData(){

  }
}
