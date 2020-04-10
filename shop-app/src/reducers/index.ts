import { Reducer as APIReducer } from './api';
import { Reducer as EntitiesReducer } from './entities';

// import { Reducer as WorkbenchReducer } from './workbench';

export namespace Reducer {
  export type State = {
    api: APIReducer.State;
    entities: EntitiesReducer.State;
    // session: SessionReducer.State;
  };

  export const initialState: State = {
    api: APIReducer.initialState,
    entities: EntitiesReducer.initialState,
    // session: SessionReducer.initialState,
  };

  export const apiReducer = APIReducer.reducer;
  // export const workbenchReducer = WorkbenchReducer.reducer;
  export const entitiesReducer = EntitiesReducer.reducer;
  // export const wizardReducer = WizardReducer.reducer;
  // export const inviteReducer = InviteReducer.reducer;
  // export const sessionReducer = SessionReducer.reducer;
  // export const outageReducer = OutageReducer.reducer;
}
