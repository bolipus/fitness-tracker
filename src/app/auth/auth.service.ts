import { Subscription } from 'rxjs';

import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { startLoading, stopLoading } from '../shared/ui.actions';
import { loginAction, logoutAction } from './auth.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private uiService: UiService,
    private store: Store<AppState>) { }


  authListenerSubscription: Subscription | null = null;

  initAuthListener(): void {
    this.authListenerSubscription = this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(loginAction());
        this.router.navigate(['/training']);
      } else {
        this.store.dispatch(logoutAction());
        this.router.navigate(['/login']);
      }
    });
  }

  cancelAuthListenerSubscription(): void {
    this.authListenerSubscription?.unsubscribe();
  }

  registerUser(authData: AuthData): void {
    this.store.dispatch(startLoading());
    console.log('registerUser');
    this.angularFireAuth.createUserWithEmailAndPassword(authData.email, authData.password).then(
      (result) => {
        console.log(result);
        this.store.dispatch(stopLoading());
      }
    ).catch(error => {
      this.uiService.showSnackbar(error, undefined, 1000);
      this.store.dispatch(stopLoading());
      console.log(error);
    });

    this.router.navigate(['/training']);
  }

  login(authData: AuthData): void {
    console.log('login');
    this.store.dispatch(startLoading());
    this.angularFireAuth.signInWithEmailAndPassword(authData.email, authData.password).then(
      (result => {
        console.log(result);
        this.store.dispatch(stopLoading());
      })
    ).catch(error => {
      this.uiService.showSnackbar(error, undefined, 1000);
      this.store.dispatch(stopLoading());
      console.log(error);
    });


  }

  logout(): void {
    this.angularFireAuth.signOut().then(
      () => {
        console.log('logout');
      }
    ).catch(error => {
      this.uiService.showSnackbar(error, undefined, 1000);
      console.log(error);
    });

  }

}
