import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';
import { UiService } from '../../shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup | any;

  loading = false;
  loadingStateSubscription: Subscription | null = null;

  constructor(private authService: AuthService, private uiService: UiService) {
    this.loadingStateSubscription = uiService.loadingStateChanged.subscribe(
      (loading) => this.loading = loading
    );
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  ngOnDestroy(): void {
    this.loadingStateSubscription?.unsubscribe();
  }

  onLogin() {
    const authData: AuthData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.authService.login(authData);
  }

}
