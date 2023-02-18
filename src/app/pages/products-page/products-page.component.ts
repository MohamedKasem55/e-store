import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/shared-service/auth.service';
import { UserService } from 'src/app/shared-service/user.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {
  isAdmin:Observable<boolean>
  constructor(private authService:AuthService,
              private router:Router,
              private userService:UserService) { }

  ngOnInit(): void {
    this.isAdmin=this.userService.getCurrentUser().pipe(take(1),map(user=>{
      return user.isAdmin
    }))
  }
  logout(){
    this.authService.logout()
    this.router.navigateByUrl('')
  }
}
