import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User, LoginRes } from '../interfaces';
import { tap } from 'rxjs/operators';
import { MaterializeService } from '../materialize/materialize.service';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    // private token = null
    // private role = null

    private loginRes: LoginRes = null

    constructor(private http: HttpClient) { }


    register(user: User): Observable<User> {
        return this.http.post<User>('/api/auth/register', user)
    }

    login(user: User): Observable<LoginRes> {
        return this.http.post<LoginRes>('/api/auth/login', user)
            .pipe(
                tap(
                    ( loginRes) => {
                        localStorage.setItem('token', loginRes.token)
                        localStorage.setItem('role', loginRes.role)
                        this.setUserData(loginRes) 
                        // this.getUserRole()  
                        // console.log(this.role);
                                          
                    }
                )
            )
    }

    // getUserRole(): Observable<{role: string}> {
    //     return this.http.get<{role: string}>('/api/auth/get')
    //     .pipe(
    //         tap(
    //             ({ role }) => {
    //                 localStorage.setItem('role', role)
    //                 this.setRole(role)  
    //                 console.log('ssssssss',role)                     
    //             }
    //         )
    //     )
    // }

    setUserData(loginRes: LoginRes) {
        this.loginRes = loginRes
    }

    getUserData(): LoginRes {
        return this.loginRes
    }

      isAuthenticated(): boolean {
        return !!this.loginRes
    }

    logout() {
        this.setUserData(null)
        localStorage.clear()
    }

    // setToken(token: string) {
    //     this.token = token
    // }

    // setRole(role: string) {
    //     this.role = role
    // }

    // getToken(): string {
    //     return this.token
    // }

    // getRole(): string {
    //     return this.role
    // }

    // isAuthenticated(): boolean {
    //     return !!this.token
    // }

    // logout() {
    //     this.setToken(null)
    //     this.setRole(null)
    //     localStorage.clear()
    // }
}