import { Subject, Subscription } from 'rxjs';


import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authChange = new Subject<boolean>();

  private isAuthenticated = false;

  constructor(private router: Router, private angularFireAuth: AngularFireAuth, private trainingService: TrainingService) { }


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

    console.log('registerUser');
    this.angularFireAuth.createUserWithEmailAndPassword(authData.email, authData.password).then(
      (result) => console.log(result)
    ).catch(error => console.log(error));

    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

  login(authData: AuthData): void {
    console.log('login');
    this.angularFireAuth.signInWithEmailAndPassword(authData.email, authData.password).then(
      (result => {
        console.log(result);
      })
    ).catch(error => console.log(error));


  }

  logout(): void {
    this.angularFireAuth.signOut().then(
      (result) => {
        console.log('logout');
      }
    ).catch(error => console.log(error));

  }



  isAuth(): boolean {
    return this.isAuthenticated;
  }

}
