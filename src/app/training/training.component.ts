import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { TrainingService } from './training.service';
import { Excercise } from './excercise.model';
import { AppState, TrainingState, getIsTraining } from './training.reducer';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  trainingInProgress$: Observable<boolean>;

  constructor(private store: Store<TrainingState>) {
    this.trainingInProgress$ = store.select(getIsTraining);
  }

  ngOnInit(): void {
  }



}
