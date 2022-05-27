import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'raftel-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
      private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.autoLogin();
  }

}
