import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output()
  toggleSideNav: EventEmitter<any> = new EventEmitter();

  isAuth = false;

  authSubscription: Subscription;

  constructor(private authService: AuthService) {
    this.authSubscription = this.authService.authChange.subscribe((authStatus) => {
      this.isAuth = authStatus;
    })
  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onToggleSideNav(): void {
    this.toggleSideNav.emit();
  }

  logout(): void {
    this.authService.logout();
  }

}
