import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AdminData } from "../../../interfaces/admin";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { HttpResponseService } from "../../../../shared/services/http-response.service";

@Component({
  selector    : 'raftel-login',
  templateUrl : './login.component.html',
  styleUrls   : ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // DECLARE AND/OR INITIALIZE PROPERTIES AND THEIR TYPES
  // BOOLEAN
  hasError     : boolean = false;
  isLoading    : boolean = false;

  // FORMS
  authForm     : FormGroup = this.formBuilder.group({
    email      : ['', Validators.compose([Validators.required, Validators.email])],
    password   : ['', Validators.compose([Validators.required, Validators.minLength(6)])]
  });

  // OBJECTS
  adminData    : AdminData = {
    email      : '',
    password   : ''
  }

  // STRINGS
  isAuth       : string = '';
  errorMessage : string = '';

  constructor(
      // PUBLIC

      // PRIVATE
      private formBuilder         : FormBuilder,
      private router              : Router,
      private authService         : AuthService,
      private activatedRoute      : ActivatedRoute,
      private httpResponseService : HttpResponseService
  ) { }

  ngOnInit(): void {
    // GET QUERY PARAMETERS FROM URL
    this.activatedRoute.queryParams.subscribe(
        params => {
          if (params) {
            this.isAuth = params['auth'];
          }
        }
    );
  }

  // METHOD : SUBMIT LOGIN FORM
  onAuthFormSubmit(authForm: FormGroup) {
    // SHOW LOADING COMPONENT AS OVERLAY WHILE SENDING LOGIN REQUEST
    this.isLoading          = true;

    // STORE EMAIL AND PASSWORD TO USERDATA OBJECT
    this.adminData.email    = authForm.value.email;
    this.adminData.password = authForm.value.password;

    // CALL AUTHSERVICE FOR LOGIN, SUBSCRIBE, AND HANDLE RESPONSE
    this.authService.login(this.adminData).subscribe({
      // SUCCESS RESPONSE
      next : response => {
        // HIDE LOADING COMPONENT AFTER RECEIVING LOGIN RESPONSE AND SET FALSE HAS ERROR PROPERTY
        this.isLoading = false;
        this.hasError  = false;

        // CLEAR AUTHFORM
        this.authForm.reset();

        // NAVIGATE TO ADMIN COMPONENT
        this.router.navigate(['admin']);
      },
      // ERROR RESPONSE
      error: error => {
        // HIDE LOADING COMPONENT AFTER RECEIVING LOGIN RESPONSE AND SET TRUE HAS ERROR PROPERTY
        this.isLoading = false;
        this.hasError   = true;

        // STORE TO ERROR MESSAGE PROPERTY THE HTTP ERROR RESPONSE
        this.errorMessage = this.httpResponseService.convert(error.error.error.message);
      }
    });
  }

}
