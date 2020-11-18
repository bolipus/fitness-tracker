import { Subject } from 'rxjs';


import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authChange = new Subject<boolean>();

  private user: User | any;

  constructor(private router: Router) { }

  registerUser(authData: AuthData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    };
    console.log('registerUser');
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

  login(authData: AuthData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    };
    console.log('login');
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

  logout(): void {
    this.user = null;
    this.authChange.next(false);
    console.log('logout');
    this.router.navigate(['/login']);
  }

  getUser(): User {
    return { ...this.user }
  }

  isAuth(): boolean {
    return this.user != null;
  }

}
