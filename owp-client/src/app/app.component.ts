import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'owp-client';

  constructor(private authService: AuthService)  {

  }

  ngOnInit( ) {
    const token =localStorage.getItem('auth-token')
    if(token !== null) {
      this.authService.setToken(token)
    }
  }

}
