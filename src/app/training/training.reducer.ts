import { ActionReducer, TypedAction } from '@ngrx/store/src/models';
import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { fetchAvailableTrainingsAction, fetchFinishedTrainingsAction, startTraining, stopTraining } from './training.actions';
import { Excercise } from './excercise.model';
import { AppState as RootState } from '../app.reducer';


export interface TrainingState {
  availableExcercies: Excercise[];
  finishedExcercises: Excercise[];
  activeTraining: Excercise | undefined;
}

export interface AppState extends RootState {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableExcercies: [],
  finishedExcercises: [],
  activeTraining: undefined
};

export const trainingReducer: ActionReducer<TrainingState, TypedAction<string>> = createReducer(
  initialState,
  on(fetchAvailableTrainingsAction, (state: TrainingState, { excercises }) =>
    ({ ...state, availableExcercies: excercises }) as TrainingState),

  on(fetchFinishedTrainingsAction, (state: TrainingState, { excercises }) =>
    ({ ...state, finishedExcercises: excercises }) as TrainingState),

  on(startTraining, (state: TrainingState, { excercise }) => ({ ...state, activeTraining: excercise }) as TrainingState),

  on(stopTraining, (state: TrainingState) => ({ ...state, activeTraining: undefined }) as TrainingState)
);




export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExcercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExcercies);
export const getFinishedExcercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExcercises);
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);

