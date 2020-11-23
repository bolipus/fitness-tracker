import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore';


import { StoreModule } from '@ngrx/store';

import localeSi from '@angular/common/locales/sl';
import { registerLocaleData } from '@angular/common';
import { environment } from '../environments/environment';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { appReducer } from './app.reducer';
registerLocaleData(localeSi);


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'FitnessTracker'),
    AngularFirestoreModule,
    AuthModule,
    StoreModule.provideStore({ ui: appReducer })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'sl' },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue:
      {
        duration: 2500,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
