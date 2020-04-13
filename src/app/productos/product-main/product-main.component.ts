import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from './Product';

import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-main',
  templateUrl: './product-main.component.html',
  styleUrls: ['./product-main.component.css']
})
export class ProductMainComponent implements OnInit {

  whichRoute = '';
  constructor(private router: Router, private productsService: ProductsService) {
   }

  ngOnInit() {
    switch (this.router.url) {
      case '/products':
        this.whichRoute = this.router.url;
        break;
      case '/monitoreo':
        this.whichRoute = this.router.url;
        break;
      default:
        if (this.router.url.includes('new')) {
          this.whichRoute = '/new';
        } else if (this.router.url.includes('edit')) {
          this.whichRoute = '/edit';
        } else {
          this.whichRoute = '/view';
        }
        break;
    }
    // this.productsService.shareArray.subscribe(productArray =>{
    //   this.products = productArray;
    // })
  }

 
}
