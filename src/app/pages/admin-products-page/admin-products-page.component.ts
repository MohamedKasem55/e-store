import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BusyService } from 'src/app/core/services/busy.service';
import { ProductsService } from 'src/app/shared-service/products.service';
import { Product } from 'src/app/viewModel/product';

@Component({
  selector: 'app-admin-products-page',
  templateUrl: './admin-products-page.component.html',
  styleUrls: ['./admin-products-page.component.scss']
})
export class AdminProductsPageComponent implements OnInit {
  allProducts:Array<Product>;
  productForm:FormGroup;
  mode:string;
  previewImage:string;
  totalRecords:number
  page:number;
  constructor(private productsService:ProductsService,private formBuilder:FormBuilder) {
    this.productFormInit();
    this.mode='New Product';
    this.previewImage='';
    this.page=1
   }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe((products:Array<Product>)=>{
      this.allProducts=products
      console.log(this.allProducts);
      
      this.totalRecords=products.length;     

    })
  }
  deleteProduct(id){
    this.productsService.deleteProduct(id).subscribe()
  }
  productFormInit(){
    this.productForm=this.formBuilder.group({
      productTitle:'',
      productPrice:'',
      productDescription:'',
      productImage:null,
      productCategory:''

    })
  }
  productSubmit(){
    if(this.mode==="New Product")
     this.productsService.addProduct(this.productForm.value).subscribe(res=>console.log(res)
     )
    else if (this.mode==="Edit Product")
    this.productsService.editProduct(this.productForm.value).subscribe(res=>console.log(res)
    )
     this.modeChange()
   }
   modeChange(){
    this.mode='New Product'
   }
   editProduct(product){
     this.mode='Edit Product'
     this.previewImage=product.image
    this.productForm=this.formBuilder.group({
      productTitle:product.title,
      productPrice:product.price,
      productDescription:product.description,
      productCategory:product.category,
      productImage:null

    })
    console.log(this.productForm.value);
    
   }
   addProduct(){
     this.productFormInit();
     this.previewImage='';
   }
   onRate($event){
     
   }
}
