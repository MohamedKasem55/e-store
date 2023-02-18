import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../viewModel/user';
import { UserData } from '../viewModel/user-data';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  expirationDuration: number;
  logoutTimer:any;
  constructor(private userService: UserService,private router:Router) {
    this.expirationDuration = 2; //assume 2 hours expiration duration
  }
  login(username: string, password: string) {
    if (
      (username === 'admin' && password === 'admin') ||
      (username === 'user' && password === 'user')
    )
    {
      this.handleAuth(username);
      this.router.navigateByUrl('products')
    }
    else
      throw new Error("Either the Username or the Password not Correct");
      
  }

  handleAuth(username: string) {
    let token = this.generateToken();
    let isAdmin = username === 'admin' ? true : false;
    const tokenExpirationDate = new Date(
      new Date().getTime() + (this.expirationDuration * 60 * 60 * 1000)
    );    
    let user = new User(username, isAdmin, token, tokenExpirationDate);
    this.userService.setCurrentUser(user);
    localStorage.setItem('userData',JSON.stringify(user))
    this.autoLogout(this.expirationDuration*60*60*1000)
  }
  logout(){
    this.userService.setCurrentUser(null);
    localStorage.removeItem('userData');
    this.logoutTimer=null;
    /* this.router.navigateByUrl('') this line is not needed as long as 
    the auth gaurd will redirect to login in logout case */
  }
  autoLogout(expirationDuration){
    this.logoutTimer= setTimeout(() => {
      this.logout()
    },expirationDuration );
  }
  autoLogin(){
    let userData:UserData=JSON.parse(localStorage.getItem('userData'));
    if(userData)
    {
      let tokenExpireDate= new Date(userData.tokenExpirationDate);
      let loadedUser= new User(userData.username,userData.isAdmin,userData._token,
        tokenExpireDate)
      this.userService.setCurrentUser(loadedUser)
      this.autoLogout(tokenExpireDate.getTime()- new Date().getTime())
      
    }
  }
  generateToken() {
    return Math.floor(1000000000000000 + Math.random() * 9000000000000000)
      .toString(36)
      .substr(0, 10);
  }
  
}
