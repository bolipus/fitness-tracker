import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';
import { Excercise } from './excercise.model';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {

  trainingInProgress = false;

  excerciseSubscription: Subscription;

  selectedExcercise: Excercise | undefined;

  constructor(private trainingService: TrainingService) {
    this.excerciseSubscription = this.trainingService.excerciseChanged.subscribe(excercise => {
      console.log('Excercise:' + excercise?.duration);
      if (excercise) {
        this.trainingInProgress = true;
        this.selectedExcercise = excercise;
      } else {
        this.trainingInProgress = false;
      }
    });

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.excerciseSubscription.unsubscribe();
  }

}
