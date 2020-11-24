import { Subject, Subscription } from 'rxjs';

import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { startLoading, stopLoading } from '../shared/ui.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authChange = new Subject<boolean>();

  private isAuthenticated = false;

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UiService,
    private store: Store<AppState>) { }


  authListenerSubscription: Subscription | null = null;


  initAuthListener(): void {
    this.authListenerSubscription = this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubcriptions();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

  cancelAuthListenerSubscription(): void {
    this.authListenerSubscription?.unsubscribe();
  }

  registerUser(authData: AuthData): void {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(startLoading());
    console.log('registerUser');
    this.angularFireAuth.createUserWithEmailAndPassword(authData.email, authData.password).then(
      (result) => {
        console.log(result);
        this.uiService.loadingStateChanged.next(false);
      }
    ).catch(error => {
      this.uiService.showSnackbar(error, undefined, 1000);
      this.store.dispatch(stopLoading());
      console.log(error);
    });

    this.authChange.next(true);
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
      (result) => {
        console.log('logout');
      }
    ).catch(error => {
      this.uiService.showSnackbar(error, undefined, 1000);
      console.log(error);
    });

  }



  isAuth(): boolean {
    return this.isAuthenticated;
  }

}
