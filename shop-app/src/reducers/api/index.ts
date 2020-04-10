import { combineReducers } from 'redux';

import { Reducer as ErrorReducer } from './error';
import { Reducer as LoadingReducer } from './loading';

export namespace Reducer {
  export interface State {
    loading: LoadingReducer.State;
    error: ErrorReducer.State;
  }

  export const initialState = {
    loading: LoadingReducer.initialState,
    error: ErrorReducer.initialState
  };

  export const reducer = combineReducers({
    loading: LoadingReducer.reducer,
    error: ErrorReducer.reducer
  });
}
