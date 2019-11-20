import { Component, OnInit } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-empty-page',
  templateUrl: './empty-page.component.html',
  styleUrls: ['./empty-page.component.css']
})

// @Injectable({
//   providedIn: 'root'
// })

export class EmptyPageComponent implements OnInit {




  constructor(private authServise: AuthService) { }

  ngOnInit() {
  }
  
  getEmptyJson() {
    this.authServise.emptyJson().subscribe(
      res => console.log(res)
    )
  }

}
