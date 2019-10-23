import { Injectable } from "@angular/core";
import {HttpClient, HttpParams} from '@angular/common/http'
import { Position, Message } from '../interfaces'
import { Observable } from "rxjs";
 
@Injectable({
    providedIn: 'root'
})

export class PositionService {

    constructor(private http: HttpClient){}

    getByCategoryId(params: any = {}): Observable<Position[]> {
       return this.http.get<Position[]>(`/api/position/${params.id}`, {
        params: new HttpParams({
            fromObject: params
        })
    })
    }

    delete(position: Position) : Observable<Message> {
        return this.http.delete<Message>(`/api/position/${position._id}`)
    }

    create(position: Position): Observable<Position> {
        return this.http.post<Position>('/api/position', position)
    }

    update(position: Position): Observable<Position> {
        return this.http.patch<Position>(`/api/position/${position._id}`, position)
    }

}



