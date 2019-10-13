import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http'
import { Table } from '../interfaces'
import { Observable } from "rxjs";
 
@Injectable({
    providedIn: 'root'
})

export class TableService {

    constructor(private http: HttpClient){}

    getAll(): Observable<Table[]> {
       return this.http.get<Table[]>('/api/table')
    }

}