import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(
        private authService: AuthService,
        private router: Router
        ){}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

        if (this.authService.isAuthenticated){
          return true;
        }
        else {
          this.router.navigate(
              ['/admin', 'login'],
              { queryParams: { loginAgain: true} }
          );
        }
    }
}
