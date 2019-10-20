import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable, of } from 'rxjs';
import {  Injectable } from '@angular/core';
import { AuthService } from './services/auth.service'
import { MaterializeService } from './materialize/materialize.service'

@Injectable({
    providedIn: 'root'
})

export class AuthGuard  implements CanActivate, CanActivateChild{

    constructor(private authService: AuthService,
                private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        if(this.authService.isAuthenticated()) {
            return of(true)
        } else {
            this.router.navigate(['/login'], { queryParams: { accesDenied: true } } )
            MaterializeService.toast('Not so fast')
            return of(false)
        }
    }   
    
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.canActivate(route, state)
    }

}