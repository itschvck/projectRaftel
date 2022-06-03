import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from "rxjs";
import { AdminData, AdminInterface } from "../interfaces/admin";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Admin } from '../models/admin.model';

@Injectable({
  providedIn : 'root'
})
export class AuthService {

  // DECLARE AND/OR INITIALIZE PROPERTIES AND THEIR TYPES
  // ANY
  expirationTokenTimer : any;

  // STRINGS
  firebaseApiKey       : string = environment.firebaseApiKey;

  // SUBJECTS
  loggedUser           : BehaviorSubject<Admin | any> = new BehaviorSubject<Admin | any>(null);

  constructor(
      // PUBLIC

      // PRIVATE
      private httpClient : HttpClient,
      private router     : Router) { }

  // SEGREGATING STORE OF USER
  private handleAdminStore(
      id        : string,
      email     : string,
      token     : string,
      expiresIn : number) {
    // CONVERTING FIREBASE EXPIRE TIME MILLISECOND INTO DATE
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    // STORE IN METHOD VARIABLE USER THE USER WHICH IS IN USER MODEL TYPE
    const admin = new Admin(
        id,
        email,
        token,
        expirationDate);

    // EMIT TO LOGGED USER SUBJECT THE IN METHOD VARIABLE USER
    this.loggedUser.next(admin);

    // START TOKEN VALIDITY TIMER
    this.autoLogout(expiresIn * 1000);

    // STORE USER DATA TO BROWSER'S LOCAL STORAGE
    localStorage.setItem('adminData', JSON.stringify(admin));
  }

  // LOGIN METHOD
  login(adminData : AdminData) {
    return this.httpClient.post<AdminInterface>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.firebaseApiKey, {
      email             : adminData.email,
      password          : adminData.password,
      returnSecureToken : true
    })
        // PIPE TO TRANSFORM THE RESPONSE OF LOGIN OBSERVABLE - TAP TO STORE THE LOGGED USER
        .pipe(
            tap({
                  next : response => {
                    this.handleAdminStore(
                        response.localId,
                        response.email,
                        response.idToken,
                        +response.expiresIn
                    );
                  }
            }
            ));
  }

  // METHOD THAT CHECKS IF THE USER IS ALREADY LOGGED IN (IN THE BROWSER) AND AUTO LOGIN IF TRUE
  autoLogin() {
    // ASSIGN PARSED USERDATA FROM LOCAL STORAGE TO USERDATA WITH TYPE USER MODEL BUT ALL STRING
    const adminData : {
      id                   : string,
      email                : string,
      _token               : string,
      _tokenExpirationDate : string
    } = JSON.parse(localStorage.getItem('adminData') || '{}');

    // CHECK IF THERE IS A USER LOGGED, IF NOT RETURN NOTHING
    if (!adminData) {
      return;
    }

    // INSTANTIATING NEW USER WITH DATA RETRIEVED AND STORE IT IN LOADEDUSER VARIABLE
    const loadedUser = new Admin(
        adminData.id,
        adminData.email,
        adminData._token,
        new Date(adminData._tokenExpirationDate)
    );

    // CHECKING IF THE TOKEN FROM THE BROWSER IT'S STILL THE SAME OF THE TOKEN STORED IN MEMORY
    if (loadedUser.token) {
      // STORE LOADED USER
      this.loggedUser.next(loadedUser);

      // STARTING TOKEN VALIDITY TIMER WITH REMAINING TIME
      const remainingTimer = new Date(adminData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(remainingTimer);
    }
  }

  // AUTO LOGOUT METHOD WHEN TOKEN EXPIRES
  autoLogout(tokenDuration : number) {
    this.expirationTokenTimer = setTimeout(() => {
      // ALERT POPUP
      alert('Token expired. Please login again.');

      // CALL LOGOUT METHOD
      this.logout();
    }, tokenDuration);
  }

  // LOGOUT METHOD
  logout() {
    // CHANGE TO NULL LOGGED USER SUBJECT
    this.loggedUser.next(null);

    // NAVIGATE TO HOME PAGE
    this.router.navigate(['']);

    // REMOVE DATA IN BROWSER LOCAL STORAGE
    localStorage.removeItem('adminData');

    // CHECK IF THERE IS AN TOKEN EXPIRATION TIMER AND STOP
    if (this.expirationTokenTimer) {
      clearTimeout(this.expirationTokenTimer);
    }

    // RESET TOKEN TIMER TO NULL
    this.expirationTokenTimer = null;
  }

}
