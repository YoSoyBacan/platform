import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import { history } from './history';
import { Reducer } from './reducers';

export namespace AppReducer {
  export type State = Reducer.State;

  export const initialState = Reducer.initialState;

  export const rootReducer = combineReducers({
    router: connectRouter(history),
    api: Reducer.apiReducer,
    entities: Reducer.entitiesReducer
  });
}
