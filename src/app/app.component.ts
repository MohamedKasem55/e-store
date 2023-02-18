import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { BusyService } from './core/services/busy.service';
import { AuthService } from './shared-service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'E-Commerce';
  lang:string;
  constructor(private authService:AuthService,private busyService:BusyService,
    private translate :TranslateService) {
      
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.authService.autoLogin()
    this.langInit()      
  }
  selectLanguage(event){
    this.translate.use(event.target.value)
    localStorage.setItem('ecommerceLang',event.target.value)
    this.lang=event.target.value
  }
  langInit(){
    this.lang=localStorage.getItem('ecommerceLang')
    if(!this.lang)
        this.lang='en';
    if(this.lang)
        this.translate.use(this.lang);
  }
}
