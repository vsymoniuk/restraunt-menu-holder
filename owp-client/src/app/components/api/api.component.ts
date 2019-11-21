import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {

  constructor() { }

 pageContent: string = 'authentication'

  API = [
    {name: 'authentication'},
    {name: 'user'},
    {name: 'category'},
    {name: 'order'},
    {name: 'position'},
    {name: 'table'},
    {name: 'errors'}
  ]

  onTabClick( name: string ) {
      this.pageContent = name
  }

  ngOnInit() {
  }

}
