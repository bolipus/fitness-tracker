import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

import { Store } from '@ngrx/store';
import { AppState, getAuthIsAuthenticated } from '../../app.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  @Output()
  closeSideNav: EventEmitter<any> = new EventEmitter();

  isAuth$: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store<AppState>) {
    this.isAuth$ = this.store.select(getAuthIsAuthenticated);
  }

  ngOnInit(): void {
  }
  onCloseSideNav(): void {
    this.closeSideNav.emit();
  }

  logout(): void {
    this.onCloseSideNav();
    this.authService.logout();

  }

}
