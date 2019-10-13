import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit {

  links = [
    {url: '/users', name: 'Користувачі'},
    {url: '/categories', name: 'Асортимент '},
    {url: '/tables', name: 'Столики'}
  ]



  constructor(private router: Router) { }

  ngOnInit() {
  }

}
