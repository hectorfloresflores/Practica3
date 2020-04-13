import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, Especificacion } from '../Product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  id: number;
  product: Product;
  attr: string;
  unidad: string;
  valor: string;
  whichRoute = '';

  uid: number;
  nombre: string;
  marca: string;
  precio: number;
  descripcion: string;
  existencia: number;
  especificacion: Especificacion[];

  constructor(private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { 
      
    }

  ngOnInit() {
    this.activatedRoute
    .params
    .subscribe(
      (params) => {
        this.id = params['id'];
      }
    )
    this.whichRoute = this.router.url;

    if (this.whichRoute != '/products/new') {
      this.product = this.productsService.getProduct(this.id);
      console.log(this.product)
      this.nombre = this.product.nombre;
      this.descripcion = this.product.descripcion;
      this.precio = this.product.precio;
      this.marca = this.product.marca;
      this.existencia = this.product.existencia;
    }
  
      

  }

  addAttr() {
    this.product.especificacion.push(new Especificacion(this.attr,this.unidad,this.valor))
    // this.productsService.addSpec(this.product.uid,this.attr,this.unidad,this.valor);
  }

  saveProduct() {
    this.product.nombre = this.nombre
    this.product.descripcion = this.descripcion
    this.product.existencia = this.existencia
    this.product.marca = this.marca
    this.product.precio = this.precio

  }
  createProduct() {
    this.productsService.getProducts().push(
      new Product(this.uid,
        this.nombre,
        this.marca,
        this.descripcion,
        this.precio,
        this.existencia,
        this.especificacion))
  }
  deletAttr(attr) {
    let index = this.product.especificacion.findIndex(p => {
      return p.atributo === attr;
    })
      console.log(index,attr)
      this.product.especificacion.splice(index,1);
  }

}
