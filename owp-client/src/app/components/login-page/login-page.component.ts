import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterializeService, Modal } from '../../services/materialize.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('modal', null) modalRef: ElementRef
  modal: Modal
  form: FormGroup
  sub: Subscription
  
  @ViewChild('email',null) emailRef: ElementRef
  email: string = null
  isTrusted: boolean = false
  isEmail: boolean = false

  @ViewChild('code',null) codeRef: ElementRef
  correctCode: number = null
  enteredCode: number = null

  @ViewChild('password', null) passwordRef: ElementRef

  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngAfterViewInit() {
    this.modal = MaterializeService.initModal(this.modalRef)
  }

  ngOnInit() {
    this.authService.logout()
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    })



    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        MaterializeService.toast('Вітаємо! Тепер ви можете увійти в систему.')
      } else if (params['accesDenied']) {
        MaterializeService.toast('Для початку роботи, пройдіть авторизацію.')
      } else if (params['sessionExpired']) {
        MaterializeService.toast('Увійдіть, будь ласка, знову')
      }
    })
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe()
    this.modal.destroy()
  }


  onSubmit() {
    this.form.disable()

    this.sub = this.authService.login(this.form.value).subscribe(
      () => {
        this.router.navigate(['/tables'])
      },
      error => {
        MaterializeService.toast(error.error.message)
        this.form.enable()
      }
    )
  }

  onPasswordRestoring() {
    this.isEmail = false
    this.isTrusted = false
    this.modal.open()
  }

  sendEmail(){
    this.email = this.emailRef.nativeElement.value
    this.authService.emailConfirm(this.email).subscribe(
      res => this.correctCode = +res.message
    )
    this.isEmail = true
  }

  checkCode(){
    this.enteredCode = +this.codeRef.nativeElement.value
    if(+this.codeRef.nativeElement.value == this.correctCode) {
      this.isTrusted = true
    } else {
      MaterializeService.toast('Невірний код! Спробуйте знову')
    }
  }

  resetPassword(){
    this.authService.restorePassword(this.passwordRef.nativeElement.value, `${this.enteredCode}`, this.email)
    .subscribe(
      res => MaterializeService.toast('Зміна паролю пройшла успішно!'),
      err => MaterializeService.toast(err.message ? err.message : err)
    )
    this.modal.close()
  }

}
