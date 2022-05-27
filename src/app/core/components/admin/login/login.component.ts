import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AdminData } from "../../../interfaces/admin";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'raftel-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

//Link authForm to Reactive Form in template
  authForm = this.fb.group({
    email   : ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
  });

  //Initialize adminData object with Admin interface
  adminData: AdminData = {
    email   : '',
    password: ''
  }

  //Check if redirected for unauthorized navigation
  isAuth    : string = '';

  //Initialize error status
  hasError  : boolean = false;

  //Initialize status for loader
  isLoading : boolean = false;

  constructor(
      private fb         : FormBuilder,
      private r          : Router,
      private authService: AuthService
  ) { }

  ngOnInit(): void {

  }

  //Form submit method
  onSubmit(authForm: FormGroup) {
    this.isLoading = true;
    console.log(this.isLoading);
    //Store email and password to userData object
    this.adminData.email    = authForm.value.email;
    this.adminData.password = authForm.value.password;
    // Call authService for login, subscribe, and handle response
    this.authService.login(this.adminData).subscribe({
      next : response => {
        this.isLoading = false;
        this.hasError   = false;
        //Clear authForm
        this.authForm.reset();
        this.r.navigate(['admin']);
      },
      error: error => {
        this.isLoading = false;
        this.hasError   = true;
      }
    });
  }

}
