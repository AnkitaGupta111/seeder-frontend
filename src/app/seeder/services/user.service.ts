import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    loggedInUser = new BehaviorSubject({})

    constructor(private httpClient: HttpClient) {
    }

    signUp(payload: any): Observable<any> {
        return this.httpClient
            .post<any | HttpErrorResponse>("users", { ...payload })
    }

    getUser() {
        const userData = JSON.parse(sessionStorage.getItem('userData') as string);

        this.httpClient
            .get<any | HttpErrorResponse>(`users/${userData.id}`).subscribe({ next: (response) => { this.loggedInUser.next(response) } })
    }

}