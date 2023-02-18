import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {map, take} from 'rxjs/operators'
import { UserService } from 'src/app/shared-service/user.service';
@Injectable({
 providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 constructor(private userService:UserService,private router:Router){

 }
 canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot):
   Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   return this.userService.getCurrentUser().pipe(take(1),map(user=>{
    if(user===null)
     return this.router.createUrlTree([''])
    else 
    return true
   }))
 }
 
}
