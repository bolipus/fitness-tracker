import { ActionReducer, TypedAction } from '@ngrx/store/src/models';
import { createReducer, on } from '@ngrx/store';
import { loginAction, logoutAction } from './auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false
};

export const authReducer: ActionReducer<AuthState, TypedAction<string>> = createReducer(
  initialState,
  on(loginAction, (state: AuthState) => ({ ...state, isAuthenticated: true }) as AuthState),
  on(logoutAction, (state: AuthState) => ({ ...state, isAuthenticated: false }) as AuthState),
)

export const getIsAuthenticated = (state: AuthState) => state.isAuthenticated;
