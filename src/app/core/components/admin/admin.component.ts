import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'raftel-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  //Check if redirected for unauthorized navigation
  isAuth: string = '';

  constructor(
      private authService: AuthService,
      private ar         : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.ar.queryParams.subscribe(
        params => {
          this.isAuth = params['auth'];
        }
    );
  }

}
