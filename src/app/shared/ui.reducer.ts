import { createReducer, on } from '@ngrx/store';
import { ActionReducer, TypedAction } from '@ngrx/store/src/models';
import { startLoading, stopLoading } from './ui.actions';

export interface UiState {
  isLoading: boolean;
}

const initialState: UiState = {
  isLoading: false
};

export const uiReducer: ActionReducer<UiState, TypedAction<string>> = createReducer(
  initialState,
  on(startLoading, (state: UiState) => ({ ...state, isLoading: true }) as UiState),
  on(stopLoading, (state: UiState) => ({ ...state, isLoading: false }) as UiState),
)

export const getIsLoading = (state: UiState) => state.isLoading;
