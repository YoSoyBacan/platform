import { combineReducers } from 'redux';

import { Reducer as HomeReducer } from './home';

export namespace Reducer {
  export interface State {
    home: HomeReducer.State;
  }
  export const initialState = {
    home: HomeReducer.initialState
  };

  export const reducer = combineReducers({
    home: HomeReducer.reducer
  });
}