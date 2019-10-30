import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'})
export class AppComponent implements OnInit {
  title = 'owp-client';

  constructor(private authService: AuthService)  {

  }

  ngOnInit( ) {
    const token =localStorage.getItem('token')
    const role = localStorage.getItem('role')
    if(token !== null && role!== null) {
      this.authService.setUserData({token,role})
    }
  }

}
