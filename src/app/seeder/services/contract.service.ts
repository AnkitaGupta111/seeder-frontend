import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',

})
export class ContractService {

    contracts = new BehaviorSubject<any>(null)

    constructor(private httpClient: HttpClient) {
    }
   
    getContracts(quryParams: any = {}): Observable<any> {

        let params = new HttpParams();
        for (const key in quryParams) {
            if (quryParams.hasOwnProperty(key)) {
                params = params.set(key, quryParams[key]);
            }
        }

        return this.httpClient
            .get<any>("contracts", { params })
            .pipe(
                map((responseData) => {
                    return responseData.map((contracts: any) => ({
                        ...contracts?.contractDetail,
                        status: contracts.status
                    }
                    ))
                }), tap((c) => {
                    if (!Object.keys(quryParams)?.length) {
                        this.contracts.next(c)
                    }
                }),
                catchError((errResponse) => { console.error(errResponse); return throwError(() => new Error(errResponse.error?.message)) }),
            );
    }


}
