import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private snackBar: MatSnackBar) {

  }

  showSnackbar(message: string, action: string | undefined, duration: number): void {
    this.snackBar.open(message, action, {
      duration
    });
  }
}
