import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState, getAuthIsAuthenticated } from '../app.reducer';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private store: Store<AppState>, private router: Router) {

  }
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.store.select(getAuthIsAuthenticated).pipe(take(1));
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.store.select(getAuthIsAuthenticated).pipe(take(1));
  }

}
