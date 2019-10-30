import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/interfaces';
import { CategoryService } from 'src/app/services/category.service';
import { AuthService } from 'src/app/services/auth.service';
import { MaterializeService } from 'src/app/services/materialize.service';
import { materialize, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('role') role: string
  users: User[] = []

  constructor(private authService: AuthService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.role === 'Відвідувачі') {
      this.role = 'customer'
    } else if (this.role === 'Офіціанти') {
      this.role = 'waiter'
    } else if (this.role === 'Кухарі') {
      this.role = 'cook'
    } else {
      this.role = ''
    }

    console.log('sssaaass on init', this.role);
    

  }

  ngOnDestroy() {
    this.users = []
    console.log('sssaaass on destroy',this.role);
  }

  ngAfterViewInit() {
    // this.fetch(this.role)
    // console.log('sssaaass after init',this.role);
  
    // this.authService.getUsersByRole('customer').subscribe(
    //   users => {
    //     this.users = users
    //   }
    // )

  }

  private fetch(role: string) {

    

  //   this.route.params.pipe(
  //     switchMap(
  //       (params: Params) => {
  //         if (this.role === '') {
  //           MaterializeService.toast('Такого типу користувачів не існує')
  //           return of(null)
  //         } else {
  //           console.log('sssaaass on get');
  //           const parameters = Object.assign({}, {
  //             role: this.role
  //           })
  //           return this.authService.getUsersByRole(parameters)
  //         }
  //       }
  //     )
  //   )

  }

}
