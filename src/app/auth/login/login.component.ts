import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';
import { UiService } from '../../shared/ui.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, getUiIsLoading } from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | any;

  loading$: Observable<boolean>;

  constructor(private authService: AuthService, private uiService: UiService, private store: Store<AppState>) {
    this.loading$ = this.store.select(getUiIsLoading);
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  onLogin(): void {
    const authData: AuthData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.authService.login(authData);
  }

}
