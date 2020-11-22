import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';
import { UiService } from '../../shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  maxDate!: Date;

  loading = false;
  loadingStateSubscription: Subscription | null = null;

  constructor(private authService: AuthService, private uiService: UiService) {
    this.loadingStateSubscription = uiService.loadingStateChanged.subscribe(
      (loading) => this.loading = loading
    );
  }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }


  ngOnDestroy(): void {
    this.loadingStateSubscription?.unsubscribe();
  }

  onSubmit(form: NgForm): void {
    const authData: AuthData = {
      email: form.value.email,
      password: form.value.password
    }
    this.authService.registerUser(authData);
  }

}
