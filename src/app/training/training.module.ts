import { NgModule } from '@angular/core';
import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';

import { SharedModule } from '../shared/shared.module';
import { StopTrainingDialogComponent } from './current-training/stop-training-dialog/stop-training-dialog.component';
import { TrainingRoutingModule } from './training-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../app.reducer';
import { trainingReducer } from './training.reducer';



@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingDialogComponent
  ],
  imports: [
    SharedModule,
    TrainingRoutingModule,
    StoreModule.forFeature('training', trainingReducer)
  ]
})
export class TrainingModule { }
