import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { uiReducer, UiState, getIsLoading } from './shared/ui.reducer';
import { AuthState, authReducer, getIsAuthenticated } from './auth/auth.reducer';

export interface AppState {
  ui: UiState;
  auth: AuthState;
}


export const reducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
  auth: authReducer
};

export const getUiState = createFeatureSelector<UiState>('ui');
export const getUiIsLoading = createSelector(getUiState, getIsLoading);

export const getAuthState = createFeatureSelector<AuthState>('auth');
export const getAuthIsAuthenticated = createSelector(getAuthState, getIsAuthenticated);
