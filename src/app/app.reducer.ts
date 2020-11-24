import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { uiReducer, UiState, getIsLoading } from './shared/ui.reducer';

export interface AppState {
  ui: UiState;
}


export const reducers: ActionReducerMap<AppState> = {
  ui: uiReducer
};

export const getUiState = createFeatureSelector<UiState>('ui');
export const getUiIsLoading = createSelector(getUiState, getIsLoading);
