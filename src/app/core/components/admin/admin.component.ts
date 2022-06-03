import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector    : 'raftel-admin',
  templateUrl : './admin.component.html',
  styleUrls   : ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  // DECLARE AND/OR INITIALIZE PROPERTIES AND THEIR TYPES
  // STRINGS
  isAuth : string = '';

  constructor(
      // PUBLIC

      // PRIVATE
      private authService    : AuthService,
      private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    // GET QUERY PARAMETERS FROM URL
    this.activatedRoute.queryParams.subscribe(
        params => {
          this.isAuth = params['auth'];
        }
    );
  }

}
