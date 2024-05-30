import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from "../../../environment/environments";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private whiteListUrls = ['login', 'users']


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const userData = JSON.parse(sessionStorage.getItem('userData') as string);

        const token = userData?.token;
        const headers = this.whiteListUrls.find(w => req.url.includes(w) && req.method == 'POST') ? req.headers : req.headers.append('Authorization', `Bearer ${token}`);

        const updatedRequest = req.clone({
            url: `${environment.BAS_API_URL}/${req.url}`,
            headers
        });
        return next.handle(updatedRequest);
    }

}