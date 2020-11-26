import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Excercise } from '../excercise.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getAvailableExcercises } from '../training.reducer';
import { getIsLoading } from '../../shared/ui.reducer';
import { AppState } from '../../app.reducer';
import { stopTraining } from '../training.actions';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  availableExcercises$: Observable<Excercise[]>;

  selectedExcerciseId: string | undefined;

  isLoading$: Observable<boolean>;

  constructor(private trainingService: TrainingService, private store: Store<AppState>) {
    this.isLoading$ = this.store.select(getIsLoading);
    this.availableExcercises$ = this.store.select(getAvailableExcercises);
  }

  ngOnInit(): void {
    this.fetchAvailableExcercies();
    this.store.dispatch(stopTraining());
  }


  onStartTraining(): void {
    if (this.selectedExcerciseId !== undefined) {
      this.trainingService.startExcercise(this.selectedExcerciseId);
    }
  }

  fetchAvailableExcercies(): void {
    this.trainingService.fetchAvailableExcercises();
  }
}
