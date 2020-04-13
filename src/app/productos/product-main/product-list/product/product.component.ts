import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../Product';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/productos/products.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  whichRouter = '';
  constructor(private router: Router,
     private productsService: ProductsService,
     private route: ActivatedRoute) { }

  deletMe(uid) {
    if (this.router.url === '/products') {
      this.productsService.deleteProduct(uid);
    }else{
      this.productsService.deleteProductFromMonitor(uid);
    }
    
  }

  checkBox(checked) {
    console.log(checked);
    this.productsService.saveIds(checked, this.product.uid);
  }
  ngOnInit() {
    this.whichRouter = this.router.url;
  }

  detail() {
    this.router.navigate(['/products', this.product.uid]);
    //this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route})
  }
}
