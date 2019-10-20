import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MaterializeService } from '../materialize/materialize.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  sub: Subscription

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }
  
  onSubmit() {
    this.form.disable()

    this.sub = this.authService.register(this.form.value).subscribe(
      () => {
        this.router.navigate(['/login'], {queryParams: { registered: true } })
      },
      error => {
        this.form.enable()
        MaterializeService.toast(error)
      }
    )
  }

}
