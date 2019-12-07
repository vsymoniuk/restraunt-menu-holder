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
    { url: '/history', name: 'Історія'},
    { url: '/profile', name: 'Мій профіль'},
    { url: '', name: 'Вихід' }

  ]



  ngOnInit() {

    const role = this.authService.getUserData().role

    if (role === 'admin') {

      this.links.unshift({ url: '/categories', name: 'Редагування асортименту' })
      this.links.unshift({ url: '/users', name: 'Користувачі' })
      this.links.unshift({ url: '/developer', name: 'API' })

    } else if (role === 'cook') {

      

    } else if (role === 'waiter') {

this.links.unshift({ url: '/categories', name: 'Меню' })
      this.links.unshift({ url: '/order', name: 'Створити замовлення' })

    } else if (role === 'customer') {
      this.links.unshift({ url: '/categories', name: 'Меню' })
      this.links.unshift({ url: '/order', name: 'Створити замовлення' })

    }
  }

  logout(event: Event) {
    event.preventDefault()
    this.router.navigate(['/login'])
  }

}
