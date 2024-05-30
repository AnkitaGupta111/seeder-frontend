import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginResponseData } from '../../../seeder/interfaces/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private tokenExpirationTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  login(payload: any): Observable<any> {
    return this.httpClient
      .post<LoginResponseData | HttpErrorResponse>("auth/login", {
        email: payload.email,
        password: payload.password,
        expiresIn: payload.expiresIn
      })
      .pipe(
        tap((responseData) => {
          const response = responseData as LoginResponseData

          const tokenExpirationDate = new Date(
            new Date().getTime() + response.expiresIn
          );

          sessionStorage.setItem('userData', JSON.stringify({ ...response, tokenExpirationDate }));
          this.autoLogout(response.expiresIn);
        })
      );
  }

  logout(): void {
    // Remove user data on logout
    sessionStorage.removeItem('userData');
    // Clear the token expiration timer
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.router.navigate(['/login']);
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  autoLogin() {
    const userData = JSON.parse(sessionStorage.getItem('userData') as string);
    if (!userData) {
      return;
    }

    // start tokenExpirationTimer based on tokenExpirationDate
    const tokenExpirationDate = new Date(userData.tokenExpirationDate);

    if (userData.token) {
      const expirationDuration =
        tokenExpirationDate.getTime() - new Date().getTime();
      this.autoLogout(expirationDuration)
    }
  }


  isAuthenticated(): boolean {
    const userData = JSON.parse(sessionStorage.getItem('userData') as string)
    return !!(userData?.token)
  }


}
