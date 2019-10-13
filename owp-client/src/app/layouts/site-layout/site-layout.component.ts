import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit {

  links = [
    {url: '/users', name: 'Users'},
    {url: '/categories', name: 'Categories'},
    {url: '/tables', name: 'Tables'}
  ]

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
