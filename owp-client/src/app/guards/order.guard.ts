import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { MaterializeService } from '../services/materialize.service'

@Injectable({
    providedIn: 'root'
})

export class OrderGuard implements CanActivate, CanActivateChild {

    constructor(private authService: AuthService,
        private router: Router) { }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        if (this.authService.getUserData().role === 'waiter' || this.authService.getUserData().role === 'customer')
        {
            return of(true)
        } else {
            MaterializeService.toast('Ця сторінка доступна тільки для відвідувачів та офіціантів')
            this.router.navigate(['/tables'])
        return of(false)
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.canActivate(route, state)
    }

}