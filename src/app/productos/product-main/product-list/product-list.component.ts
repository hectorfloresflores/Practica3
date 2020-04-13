import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../Product';
import { Router } from '@angular/router';
import { ProductsService } from '../../products.service';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input() mode: string;

  size = 1;
  products: Product[];
  monitorProducts: Product[];
  whichRoute = '';
  busqueda = '';
  constructor(private router: Router, private productsService: ProductsService) { 
    // this.products = this.productsService.getProducts();
  }

  saveMonitor() {
    this.productsService.saveMonitor();
    console.log(this.monitorProducts);
  }

  ngOnInit() {
    this.whichRoute = this.router.url;
    this.productsService.sharedMessage.subscribe(message =>{
      this.monitorProducts = message;
    })
    this.productsService.sharedMessageProducts.subscribe(message => {
      this.products = message;
    })
  }

  search() {
    this.productsService.searchProducts(this.router.url,this.busqueda);
  }

}
