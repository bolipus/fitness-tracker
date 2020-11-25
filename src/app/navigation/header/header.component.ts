import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, getAuthIsAuthenticated } from '../../app.reducer';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output()
  toggleSideNav: EventEmitter<any> = new EventEmitter();

  isAuth$: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store<AppState>) {
    this.isAuth$ = this.store.select(getAuthIsAuthenticated);
  }


  ngOnInit(): void {
  }

  onToggleSideNav(): void {
    this.toggleSideNav.emit();
  }

  logout(): void {
    this.authService.logout();
  }

}
