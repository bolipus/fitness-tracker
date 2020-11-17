import { Subject } from 'rxjs';


import { User } from './user.model';
import { AuthData } from './auth-data.model';

export class AuthService {

  authChange = new Subject<boolean>();

  private user: User | any;

  constructor() { }

  registerUser(authData: AuthData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    };
    this.authChange.next(true);
    console.log("registerUser");

  }

  login(authData: AuthData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    };
    this.authChange.next(true);
    console.log("login");
  }

  logout(): void {
    this.user = null;
    this.authChange.next(false);
    console.log("logout");
  }

  getUser(): User {
    return { ...this.user }
  }

  isAuth(): boolean {
    return this.user != null;
  }

}
