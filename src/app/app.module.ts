import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { AdminProductsPageComponent } from './pages/admin-products-page/admin-products-page.component';
import { UserProductsPageComponent } from './pages/user-products-page/user-products-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginComponent } from './reusable-components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from'@angular/common/http';
import { ProductCardComponent } from './reusable-components/product-card/product-card.component'
import { NgxPaginationModule } from 'ngx-pagination';
import {FilterSearchModule} from 'ng-filter-search';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LoadingInterceptor } from './core/interceptors/loading/loading.interceptor';
import { RatingModule } from 'ng-starrating';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { NgxSpinnerModule } from "ngx-spinner";
 
import { TranslateHttpLoader } from '@ngx-translate/http-loader'; 
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    ProductsPageComponent,
    AdminProductsPageComponent,
    UserProductsPageComponent,
    LoginPageComponent,
    LoginComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    FilterSearchModule,
    Ng2SearchPipeModule,
    RatingModule,
    NgxStarRatingModule,
    NgxSpinnerModule,
     TranslateModule.forRoot({
      defaultLanguage:'en',
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
     ServiceWorkerModule.register('ngsw-worker.js', {
       enabled: environment.production,
       // Register the ServiceWorker as soon as the app is stable
       // or after 30 seconds (whichever comes first).
       registrationStrategy: 'registerWhenStable:30000'
     }) 
  ],
  providers: [
     {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 export function HttpLoaderFactory (http:HttpClient):TranslateHttpLoader  {

  return new TranslateHttpLoader(http);
  }
 