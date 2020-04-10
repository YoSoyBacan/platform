import { Actions, ActionTypes } from '../../actions';
import { Models } from '../../common/models';

export namespace Reducer {
  export type State = Models.HomePage | null;
  export const initialState: State = null;

  export function reducer(state = initialState, action: Actions) {
    switch (action.type) {
      case ActionTypes.GET_HOME_PAGE_SUCCESS:
        return action.payload;
      default:
        return state;
    }
  }
}