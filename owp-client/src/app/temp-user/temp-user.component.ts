import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-temp-user',
  templateUrl: './temp-user.component.html',
  styleUrls: ['./temp-user.component.css']
})
export class TempUserComponent implements OnInit {

  users: User[] = []

  constructor(private authService: AuthService) {
  }
  
  ngOnInit() {
    
    this.authService.getAll().subscribe(
      users => {
        this.users = users
      },
      error => console.log(error.message ? error.message : error)
    )
    
  }

}
