import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { AuthService } from "../../../../services/auth.service";

@Component({
  selector: 'raftel-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

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
