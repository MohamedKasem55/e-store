import { Component, OnInit } from '@angular/core';
import { FilterSearchService } from 'ng-filter-search';
import { ProductsService } from 'src/app/shared-service/products.service';
import { Product } from 'src/app/viewModel/product';

@Component({
  selector: 'app-user-products-page',
  templateUrl: './user-products-page.component.html',
  styleUrls: ['./user-products-page.component.scss']
})
export class UserProductsPageComponent implements OnInit {
  allProducts:any
  allCategories:Array<string>
  totalRecords:number
  page:number;
  searchMap:Array<string>;
  clonerArr:Array<Product>;
  searchKeyWord:string
  constructor(private productService:ProductsService,private fs:FilterSearchService) { 
    this.allProducts=[]
    this.allCategories=[];
    this.page=1;
    this.searchMap=['category'];
    this.searchKeyWord=''
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products:Array<Product>)=>{
        this.allProducts=products;
        this.totalRecords=products.length;     
        this.clonerArr=[...this.allProducts]
               
    })
    this.productService.getAllCategories().subscribe((categories:Array<string>)=>{
        this.allCategories=categories;                      
    })
  }
  onCategoryChange(sval: string): void {
    // Use filterSearch() function to filter the data
    if(sval==="all")
    this.allProducts=this.clonerArr;
    else
    this.allProducts =  this.fs.filterSearch(sval, this.clonerArr, this.searchMap);
    console.log(this.allProducts);
    
}

}
