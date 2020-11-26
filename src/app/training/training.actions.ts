import { createAction, props } from '@ngrx/store';
import { Excercise } from './excercise.model';


export const fetchAvailableTrainingsAction = createAction('[Training] Fetch available trainings', props<{ excercises: Excercise[] }>());
export const fetchFinishedTrainingsAction = createAction('[Training] Fetch trainings', props<{ excercises: Excercise[] }>());
export const startTraining = createAction('[Training] Start training', props<{ excerciseId: string }>());
export const stopTraining = createAction('[Training] Stop training');

