import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MaterializeService, Modal, Tabs } from 'src/app/services/materialize.service';
import { User } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { error } from 'util';
import { Router } from '@angular/router';
// import { del } from 'selenium-webdriver/http';


declare var M

@Component({
  selector: 'app-staff-register-page',
  templateUrl: './staff-register-page.component.html',
  styleUrls: ['./staff-register-page.component.css']
})
export class StaffRegisterPageComponent implements AfterViewInit {

  // @ViewChild('tabs', null) modalRef: ElementRef

  currentRole: string = 'customer'
  users: User[] = []
  dropdown

  roles = [
    { name: 'Відвідувачі', role: 'customer' },
    { name: 'Офіціанти', role: 'waiter' },
    { name: 'Кухарі', role: 'cook' }
  ]

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.fetch()
  }

  private fetch() {
    this.authService.getUsersByRole(this.currentRole).subscribe(
      res => {
        this.users = res
      },
      error => {
        MaterializeService.toast(`Role "${this.currentRole}" does not exist!`)
        this.router.navigate([`/404`])
      }
    )
  }

  deleteUser(user: User) {
    const deleting = window.confirm(`Ви дійсно хочете видалити "${user.email}" ?`)

    if (deleting) {
      this.authService.delete(user).subscribe(
        response => {
          const index = this.users.findIndex(c => c._id === user._id)
          MaterializeService.toast(`Користувач "${this.users[index].email}" був успішно видалений`)
          this.users.splice(index, 1)
        },
        error => MaterializeService.toast(error.message ? error.message : error)
      )
    }
  }

  onTabClick(role: string) {
    this.currentRole = role
    this.fetch()
  }

  roleChanging(user: User, role: string) {
    const deleting = window.confirm(`Ви дійсно хочете змінити роль "${user.email}" на "${role}" ?`)

    if (deleting) {
      user.role = role
      this.authService.update(user).subscribe(
        res => {
          const index = this.users.findIndex(c => c._id === user._id)
          MaterializeService.toast(`Користувач "${this.users[index].email}" отримав роль "${role}"!`)
          this.users.splice(index, 1)
        },
        error => MaterializeService.toast(error.message ? error.message : error)
      )
    }
  }

  isUsers() {
    return !(this.users.length == 0)
  }

  myProfile() {
    this.authService.myProfile().subscribe(
      res => console.log(res) 
    )
  }

}
