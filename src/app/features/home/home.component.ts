import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { AuthService } from "../../core/services/auth.service";

@Component({
  selector: 'raftel-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  //Declare variable for subscription
  private adminStatus!: Subscription;

  //Declare checker for log in
  isLogged            : boolean = false;

  constructor(
      private authService: AuthService
  ) { }

  ngOnInit(): void {
    //Assign to subscription variable the subscription of the logged user
    this.adminStatus = this.authService.loggedUser.subscribe({
      next: admin => {
        this.isLogged = !!admin;
      }
    });
  }

  onLogOut() {
    this.authService.logout();
  }

  ngOnDestroy() {
    //Destroy subscription
    this.adminStatus.unsubscribe();
  }

}
