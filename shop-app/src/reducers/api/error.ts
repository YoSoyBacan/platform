import { Actions, ActionTypes } from '../../actions';
import { ErrorPayload } from '../../common/models';
import { Utils } from '../../common/utils';

export namespace Reducer {
  export type State = {
    [key: string]: {
      error: ErrorPayload.RequestFailure;
    };
  };

  export const initialState: State = {};

  export function reducer(state = initialState, action: Actions) {
    switch (action.type) {
      case ActionTypes.API_REQUEST_ERROR:
        if (!action.error) {
          return { ...state };
        }
        return {
          ...state,
          [Utils.State.getStateKey(
            action.payload.entity,
            action.payload.context
          )]: {
            error: action.error.body
          }
        };
      case ActionTypes.API_REQUEST_START:
      case ActionTypes.API_REQUEST_COMPLETE:
      case ActionTypes.API_CLEAR_ERRORS:
        const newState = { ...state };
        delete newState[
          Utils.State.getStateKey(action.payload.entity, action.payload.context)
        ];
        return newState;
      // case CommonActionTypes.WIZARD_START:
      //   return {};
      default:
        return state;
    }
  }
}
