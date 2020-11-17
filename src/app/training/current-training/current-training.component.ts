import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingDialogComponent } from './stop-training-dialog/stop-training-dialog.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  @Output()
  trainingExit = new EventEmitter<any>();

  interval: any;
  progress = 0;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.startAndResumeTimer();
  }

  startAndResumeTimer(): void {
    this.interval = setInterval(() => {
      this.progress += 1;
      if (this.progress >= 100) {
        this.progress = 100;
        clearInterval(this.interval);
      }
    }, 100);
  }

  onStopTimer(): void {

    const dialogRef = this.dialog.open(StopTrainingDialogComponent, {
      data: { progress: this.progress },
    });
    dialogRef.afterClosed().subscribe(result => {
      clearInterval(this.interval);
      if (result) {
        this.trainingExit.emit();
      } else {
        this.startAndResumeTimer();
      }
    });
  }


}
