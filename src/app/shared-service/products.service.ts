import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../viewModel/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http:HttpClient) {
   }
   getAllProducts(){
    return this.http.get(environment.productsApi);
   }
   getAllCategories(){
    return this.http.get(`${environment.productsApi}/categories`);
   }
   deleteProduct(id)
   {
     return this.http.delete(`${environment.productsApi}/${id}`);
   }
   addProduct(product){
    return this.http.post(`${environment.productsApi}`,JSON.stringify(product))
   }
   editProduct(product){
    return this.http.patch(`${environment.productsApi}/${product.id}`,JSON.stringify(product))
   }
}
