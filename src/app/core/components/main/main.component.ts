import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GlobalStore } from "../../../shared/stores/global.store";

@Component({
  selector: 'raftel-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

  loginPage: boolean = false;

  constructor(
      public  r : Router
  ) { }

  ngOnInit(): void {
  }

}
