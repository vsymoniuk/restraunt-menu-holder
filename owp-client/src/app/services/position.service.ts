import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http'
import { Position, Message } from '../interfaces'
import { Observable } from "rxjs";
 
@Injectable({
    providedIn: 'root'
})

export class PositionService {

    constructor(private http: HttpClient){}

    getByCategoryId(categoryId: string): Observable<Position[]> {
       return this.http.get<Position[]>(`/api/position/${categoryId}`)
    }

    delete(position: Position) : Observable<Message> {
        return this.http.delete<Message>(`/api/position/${position._id}`)
    }

}