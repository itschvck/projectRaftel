import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { AuthService } from "../../core/services/auth.service";

@Component({
  selector    : 'raftel-home',
  templateUrl : './home.component.html',
  styleUrls   : ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  // DECLARE AND/OR INITIALIZE PROPERTIES AND THEIR TYPES
  // BOOLEAN
  isLogged             : boolean = false;

  // SUBSCRIPTIONS
  private adminStatus !: Subscription;


  constructor(
      private authService: AuthService
  ) { }

  ngOnInit(): void {
    // ASSIGN TO SUBSCRIPTION VARIABLE THE SUBSCRIPTION OF THE LOGGED USER
    this.adminStatus = this.authService.loggedUser.subscribe({
      next: admin => {
        this.isLogged = !!admin;
      },
      error: err => {

      }
    });
  }

  ngOnDestroy() {
    // DESTROY SUBSCRIPTION
    this.adminStatus.unsubscribe();
  }

}
