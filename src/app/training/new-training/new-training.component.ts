import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Excercise } from '../excercise.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  excercises: Excercise[] = [];

  selectedExcerciseId: string | undefined;

  excercisesSubcription: Subscription | null = null;

  constructor(private trainingService: TrainingService) {

  }

  ngOnInit(): void {
    this.excercisesSubcription = this.trainingService.avalExcercisesChanged.subscribe((excercises: Excercise[]) => {
      console.log('ExNew :' + excercises);
      this.excercises = excercises;
    });

    this.trainingService.fetchAvailableExcercises();
  }

  ngOnDestroy(): void {
    this.excercisesSubcription?.unsubscribe();
  }

  onStartTraining(): void {
    this.trainingService.startExcercise(this.selectedExcerciseId);
  }
}
