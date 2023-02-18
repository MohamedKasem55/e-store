import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../viewModel/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userSubject:BehaviorSubject<User>
  user$:Observable<User>
  constructor() {
    this.userSubject= new BehaviorSubject<User>(null);
    this.user$=this.userSubject.asObservable()
   }
  getCurrentUser():Observable<User> {
    return this.user$;
  }
  setCurrentUser(user:User|null){
    this.userSubject.next(user)
  }
}
