import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Excercise } from '../excercise.model';
import { Observable, Subscription } from 'rxjs';
import { UiService } from '../../shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  excercises: Excercise[] = [];

  selectedExcerciseId: string | undefined;

  excercisesSubcription: Subscription | null = null;

  loadingSubcription: Subscription | null = null;

  isLoading = true;

  constructor(private trainingService: TrainingService, private uiService: UiService) {

  }

  ngOnInit(): void {
    this.excercisesSubcription = this.trainingService.avalExcercisesChanged.subscribe((excercises: Excercise[]) => {
      console.log('ExNew :' + excercises);
      this.excercises = excercises;
    });

    this.loadingSubcription = this.uiService.loadingStateChanged.subscribe(
      (isLoading) => this.isLoading = isLoading
    );

    this.trainingService.fetchAvailableExcercises();
  }

  ngOnDestroy(): void {
    this.excercisesSubcription?.unsubscribe();
    this.loadingSubcription?.unsubscribe();
  }

  onStartTraining(): void {
    this.trainingService.startExcercise(this.selectedExcerciseId);
  }

  fetchAvailableExcercies(): void {
    this.trainingService.fetchAvailableExcercises();
  }
}
