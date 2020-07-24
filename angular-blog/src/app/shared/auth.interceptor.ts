import { AlertService } from './../admin/shared/services/alert.service';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from './../admin/shared/services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Set header with auth token');
    if (this.authService.isAuthenticated){
      req = req.clone({
        setHeaders: {
          auth: this.authService.token
        }
      });
    }
    return next.handle(req)
      .pipe(
        tap(() => {
          console.log('AuthInterceptor...');
        }),
        catchError(this.handleError.bind(this))
      );
  }

  handleError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    console.log('Auth interceptor handled an error:', error);
    if (error.status === 401) {
      this.authService.logout();
      this.router.navigate(['/admin', 'login'], {
        queryParams: {
          authFailed: true,
        },
      });
    }
    return throwError(error);
  }
}
