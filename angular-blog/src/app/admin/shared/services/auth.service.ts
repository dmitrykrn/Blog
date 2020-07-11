import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginRequest } from 'src/app/core/login-request';
import { Observable } from 'rxjs/internal/Observable';
import { tap, catchError } from 'rxjs/operators';
import { UserToken } from 'src/app/core/user-token';
import { OperatorFunction, throwError, Subject } from 'rxjs';
import { LoginError } from 'src/app/core/login-error';

@Injectable()
export class AuthService {
  private userTokenKey = 'user-token_id';
  private expirationDateKey = 'user-token-exp';
  private apiUrl = 'http://localhost:5000/login';
  public error$: Subject<string>;

  constructor(private http: HttpClient ) {
    this.error$ = new Subject<string>();
  }

  public login(request: LoginRequest): Observable<UserToken> {
    console.log('Auth servise is sending login request', request);
    const res = this.http.post<UserToken>(this.apiUrl, request)
      .pipe(
          tap(this.setToken.bind(this)),
          catchError(this.handleError.bind(this))
      );
    return res;
  }

  handleError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    console.log('auth service got an error', error);

    if ((error.error as number) === LoginError.WrongMail) {
      console.log('wrong mail');
      this.error$.next('Wrong Email');
    }
    else if ((error.error as number) === LoginError.WrongPassword) {
      console.log('wrong password');
      this.error$.next('Wrong Password');
    }

    return throwError(error);
  }

  private setToken(userToken: UserToken): void {
    console.log('Auth service set user token', userToken);
    const expirationDate = new Date(Date.now() + userToken.expiresIn * 1000);
    localStorage.setItem(this.userTokenKey, userToken.id);
    localStorage.setItem(this.expirationDateKey, expirationDate.toString());
  }

  public get token(): string {
    const expirationDate = new Date(localStorage.getItem(this.expirationDateKey));
    const currentDate = new Date();
    if (currentDate > expirationDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem(this.userTokenKey);
  }

  public logout(): void {
    localStorage.clear();
  }

  public get isAuthenticated(): boolean {
    return this.token != null && this.token.length > 0;
  }

}
