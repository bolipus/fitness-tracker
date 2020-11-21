import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'FitnessTracker';



  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.initAuthListener();
  }

  ngOnDestroy(): void {
    this.authService.cancelAuthListenerSubscription();
  }

}
