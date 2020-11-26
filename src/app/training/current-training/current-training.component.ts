import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingDialogComponent } from './stop-training-dialog/stop-training-dialog.component';
import { TrainingService } from '../training.service';
import { Excercise } from '../excercise.model';
import { TrainingState, getActiveTraining } from '../training.reducer';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  selectedExcercise: Excercise | undefined;

  interval: any;
  progress = 0;

  constructor(private dialog: MatDialog, private trainingService: TrainingService, private store: Store<TrainingState>) {
    this.store.select(getActiveTraining).pipe(take(1)).subscribe(
      (excercise) => this.selectedExcercise = excercise
    );
    if (this.selectedExcercise !== undefined) {
      this.startAndResumeTimer();
    }

  }

  ngOnInit(): void {

  }

  startAndResumeTimer(): void {

    let step = 0;
    if (this.selectedExcercise !== undefined) {
      step = this.selectedExcercise?.duration / 100 * 1000;
    }

    console.log("Step:" + step);

    this.interval = setInterval(() => {
      this.progress += 10;
      if (this.progress >= 100) {
        this.progress = 100;
        this.trainingService.completeExcercise();
        clearInterval(this.interval);
      }
    }, step);
  }

  onStopTimer(): void {

    const dialogRef = this.dialog.open(StopTrainingDialogComponent, {
      data: { progress: this.progress },
    });
    dialogRef.afterClosed().subscribe(result => {
      clearInterval(this.interval);
      if (result) {
        this.trainingService.cancelExcercise(this.progress);
      } else {
        this.startAndResumeTimer();
      }
    });
  }


}
