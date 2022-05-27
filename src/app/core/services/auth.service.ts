import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from "rxjs";
import { AdminData, AdminInterface } from "../interfaces/admin";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Admin } from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Initialize logged user BehaviorSubject with User model type
  loggedUser: BehaviorSubject<Admin | any> = new BehaviorSubject<Admin | any>(null);

  //Store API Key
  firebaseApiKey: string = environment.firebaseApiKey;

  //Store token expiration timer
  expirationTokenTimer: any;

  constructor(private http: HttpClient, private r: Router) { }

  //Segregating store of user
  private handleAdminStore(id: string, email: string, token: string, expiresIn: number) {
    //Converting Firebase expire time millisecond into Date
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    //Store in method variable user the User which is in User Model type
    const admin = new Admin(
        id,
        email,
        token,
        expirationDate);
    //Emit to logged user subject the in method variable user
    this.loggedUser.next(admin);
    //Start token validity timer
    this.autoLogout(expiresIn * 1000);
    //Store user data to browser local storage
    localStorage.setItem('adminData', JSON.stringify(admin));
  }

  //Login method
  login(adminData: AdminData) {
    return this.http.post<AdminInterface>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+this.firebaseApiKey, {
      email            : adminData.email,
      password         : adminData.password,
      returnSecureToken: true
    })
        //Pipe to transform the response of login Observable
        //Tap to store the logged user
        .pipe(tap({
              next: response => {
                this.handleAdminStore(
                    response.localId,
                    response.email,
                    response.idToken,
                    +response.expiresIn);
              }
            }
        ));
  }

  //Method that checks if the user is already logged in (in the browser) and auto login if true
  autoLogin() {
    //Assign parsed userdata from local storage to userData with type user model but all string
    const adminData: {
      id: string,
      email: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('adminData') || '{}');
    //Check if there is a user Logged, if not return nothing
    if (!adminData) {
      return;
    }
    //Instantiating new user with data retrieved and store it in loadedUser variable
    const loadedUser = new Admin(
        adminData.id,
        adminData.email,
        adminData._token,
        new Date(adminData._tokenExpirationDate)
    );
    //Checking if the token from the browser it's still the same of the token stored in memory
    if (loadedUser.token) {
      this.loggedUser.next(loadedUser);
      //Starting token validity timer with remaining time
      const remainingTimer = new Date(adminData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(remainingTimer);
    }
  }

  //Auto logout method
  autoLogout(tokenDuration: number) {
    this.expirationTokenTimer = setTimeout(() => {
      alert('Token expired. Please login again.');
      this.logout();
    }, tokenDuration);
  }

  //Logout method
  logout() {
    //Assign null to logged user Subject
    this.loggedUser.next(null);
    this.r.navigate(['']);
    //Remove data in browser local storage
    localStorage.removeItem('adminData');
    //Check if there is an token expiration timer and stop
    if (this.expirationTokenTimer) {
      clearTimeout(this.expirationTokenTimer);
    }
    //Reset timer
    this.expirationTokenTimer = null;
  }

}
