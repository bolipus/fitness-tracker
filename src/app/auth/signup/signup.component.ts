import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';
import { UiService } from '../../shared/ui.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../training/training.reducer';
import { getUiIsLoading } from '../../app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  maxDate!: Date;

  isLoading$: Observable<boolean>;


  constructor(private authService: AuthService, private uiService: UiService, private store: Store<AppState>) {
    this.isLoading$ = this.store.select(getUiIsLoading);
  }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm): void {
    const authData: AuthData = {
      email: form.value.email,
      password: form.value.password
    }
    this.authService.registerUser(authData);
  }

}
