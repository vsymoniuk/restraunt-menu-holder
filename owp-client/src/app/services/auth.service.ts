import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User, LoginRes, Message } from '../interfaces';
import { tap } from 'rxjs/operators';
import { MaterializeService } from './materialize.service';
import * as cloudinaryUpload from '../../../../cloudinary'

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private loginRes: LoginRes = null

    constructor(private http: HttpClient) { }
    
    emailConfirm(email: string): Observable<Message> {
        return this.http.get<Message>(`/api/auth/confirm/${email}`)
    }

    restorePassword(password: string, code: string, email: string): Observable<Message> {
        return this.http.post<Message>('/api/auth/restore', {password, code, email})
    }


    emptyJson() {
        return this.http.get<string>('/api/auth/v1')
    }

    delete(user: User): Observable<Message> {
        return this.http.delete<Message>(`/api/auth/${user._id}`)
    }

    myProfile(): Observable<User> {
        return this.http.post<User>(`/api/auth/user/`, this.getUserData())
    }


    update(user: User, file = null): Observable<User> {

        
        // if(file) {
        //     cloudinaryUpload(file).then(
        //         res => {
        //             user.imageSrc = res.secure_url
        //             console.log(res.secure_url)
        //         }
        //     )
        // }
        

        return this.http.patch<User>(`/api/auth/${user._id}`, user)
    }

    register(user: User): Observable<User> {
        return this.http.post<User>('/api/auth/register', user)
    }

    login(user: User): Observable<LoginRes> {
        return this.http.post<LoginRes>('/api/auth/login', user)
            .pipe(
                tap(
                    (loginRes) => {
                        localStorage.setItem('token', loginRes.token)
                        localStorage.setItem('role', loginRes.role)
                        this.setUserData(loginRes)
                    }
                )
            )
    }

    getUsersByRole(role: string): Observable<User[]> {

        return this.http.get<User[]>(`/api/auth/${role}`)
    }

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


}