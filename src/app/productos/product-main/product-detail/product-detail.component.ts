import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../Product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  id: number;
  product: Product;
  constructor(private productsService: ProductsService,
            private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    
    this.activatedRoute
                    .params
                    .subscribe(
                      (params) => {
                        this.id = params['id'];
                      }
                    )

    
    this.product = this.productsService.getProduct(this.id);
    
  }

}
