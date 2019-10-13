import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../interfaces';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    
    constructor(private http: HttpClient){}

    getAll(): Observable<User[]> {
        return this.http.get<User[]>('/api/auth')
    }
}