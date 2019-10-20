import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit {

  links = [
    { url: '/categories', name: 'Асортимент ' },
    { url: '/tables', name: 'Столики' },
    { url: '', name: 'Вихід' }
  ]


  constructor( private router: Router) { }

  ngOnInit() {
  }

  logout(event: Event) {
    event.preventDefault()
    this.router.navigate(['/login'])
  }

}
