import { createAction } from '@ngrx/store';

export const startLoading = createAction('[UI] Start loading');

export const stopLoading = createAction('[UI] Stop loading');

export type UIActions = typeof startLoading | typeof stopLoading;
