import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit {
  constructor(private router: Router,
    private authService: AuthService) { }

  links = [

    { url: '/tables', name: 'Столики' },
    { url: '', name: 'Вихід' }

  ]



  ngOnInit() {
    if (this.authService.getUserData().role === 'admin') {
      this.links.push({ url: '/categories', name: 'Редгуання асортименту' })
    }
  }

  logout(event: Event) {
    event.preventDefault()
    this.router.navigate(['/login'])
  }

}
