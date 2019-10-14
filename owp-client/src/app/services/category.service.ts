import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http'
import { Category, Message } from '../interfaces'
import { Observable } from "rxjs";
 
@Injectable({
    providedIn: 'root'
})

export class CategoryService {

    constructor(private http: HttpClient){}

    getAll(): Observable<Category[]> {
       return this.http.get<Category[]>('/api/category')
    }
    
    getById(id: string) : Observable<Category> {
        return this.http.get<Category>(`/api/category/${id}`)
    }

    delete(category: Category) : Observable<Message> {
        return this.http.delete<Message>(`/api/category/${category._id}`)
    }
}