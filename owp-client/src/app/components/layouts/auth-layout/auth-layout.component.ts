import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent implements OnInit {

  links = [
    {url: '/login', name: 'Вхід '},
    {url: '/register', name: 'Реєстрація'}
  ]


  constructor(private router: Router) { }

  ngOnInit() {
  }

}
