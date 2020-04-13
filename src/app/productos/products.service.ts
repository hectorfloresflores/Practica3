import { Injectable } from '@angular/core';
import { Product, Especificacion } from './product-main/Product';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products =  [
    new Product(100, 'tele', 'samsung', 'tele de 30 pulgadas', 7000, 10, [new Especificacion('TAMANIO PANTALLA','30','PULGADAS')]),
    new Product(200, 'radio', 'sony', 'radio potente que recibe altas frecuencias', 3000, 5, []),
    new Product(301, 'lavadora', 'whirpool', 'lavadora con capacidad de 20 kg', 13000, 15, []),
    new Product(400, 'licuadora', 'oster', 'licuadora con capcidad de 2 litros', 1500, 30, [])
  ];
  auxIds = [];
  monitor = [];

  private message = new BehaviorSubject(this.monitor);
  sharedMessage = this.message.asObservable();
  private messageProducts = new BehaviorSubject(this.products);
  sharedMessageProducts = this.messageProducts.asObservable();

  constructor() {
    
  }

  saveIds(checked, uid) {
    if (this.auxIds.includes(uid) && checked === false) {
      const index = this.auxIds.findIndex(id => {
        return id === uid;
      })
      this.auxIds.splice(index,1);
      
    } else if(!this.auxIds.includes(uid) && checked === true) {
      
      this.auxIds.push(uid);
    }
    
  }

  getProducts(): Product[] {
    return this.messageProducts.getValue();
  }

  getMonitor(): Product[] {
    return this.monitor;
  }


  getProduct(uid): Product {
    let list =  this.messageProducts.getValue();

    let pro = list.find(p => {
      return p.uid === parseInt(uid);
    })
    
    return pro;
  }
  saveMonitor() {
    let list = this.products.filter((p,index) =>{
      if (this.auxIds.includes(p.uid)) {
        return p;
      }
    })
    this.message.next(list);
  }

  deleteProduct(uid) {
    const index = this.messageProducts.getValue().findIndex(product => {
      return product.uid === uid;
    })
    
    let newList = this.messageProducts.getValue();
    newList.splice(index,1);
    this.messageProducts.next(newList);
    this.deleteProductFromMonitor(uid);
  }

  deleteProductFromMonitor(uid) {
    
    let index = this.message.getValue().findIndex(p => {
      return p.uid === uid;
    })
    
    let newList = this.message.getValue();
    newList.splice(index,1);
    this.message.next(newList);

  }

  searchProducts(url, busqueda) {
    console.log(url,busqueda)
    if (url.includes('/products')) {
      let list = this.products.filter(o => o.nombre.toUpperCase().includes(busqueda.toUpperCase()));
      this.messageProducts.next(list);
      console.log(list)
    } else if(url === '/monitoreo') {
      let list = this.message.getValue().filter(o => o.nombre.toUpperCase().includes(busqueda.toUpperCase()));
      this.message.next(list);
    }
  }
}
