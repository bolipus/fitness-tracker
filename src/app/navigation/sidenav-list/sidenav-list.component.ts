import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  @Output()
  closeSideNav: EventEmitter<any> = new EventEmitter();

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

  onCloseSideNav(): void {
    this.closeSideNav.emit();
  }

  logout(): void {
    this.authService.logout();
  }

}
