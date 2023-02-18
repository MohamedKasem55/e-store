import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  errorMessage:string
  constructor(private formBuilder:FormBuilder,private authService:AuthService) { 
    this.loginFormInit()
  }

  ngOnInit(): void {
  }
  onLoginSubmit(){
    let username= this.loginForm.controls.username.value
    let password= this.loginForm.controls.password.value
    try {
      this.authService.login(username,password)
    } catch (error) {
        this.errorMessage=error;
      }
  }
  loginFormInit(){
    this.loginForm=this.formBuilder.group({
      username:[null],
      password:[null]
    })
  }
}
