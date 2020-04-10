import { Actions, ActionTypes } from '../../actions';
import { Utils } from '../../common/utils';

export namespace Reducer {
  export type State = {
    [key: string]: {
      startFetch: number;
      endFetch: number | null;
    };
  };

  export const initialState: State = {};

  export function reducer(state = initialState, action: Actions) {
    switch (action.type) {
      case ActionTypes.API_REQUEST_START:
        return {
          ...state,
          [Utils.State.getStateKey(
            action.payload.entity,
            action.payload.context
          )]: {
            startFetch: new Date().getTime(),
            endFetch: null
          }
        };
      case ActionTypes.API_REQUEST_COMPLETE:
      case ActionTypes.API_REQUEST_ERROR:
        const copy = { ...state };
        copy[
          Utils.State.getStateKey(action.payload.entity, action.payload.context)
        ].endFetch = new Date().getTime();
        return copy;
      default:
        return state;
    }
  }
}
