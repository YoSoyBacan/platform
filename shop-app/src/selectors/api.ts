import { Models } from '../common/models';
import { Utils } from '../common/utils';
import { Reducer } from '../reducers';

// TODO: can likely use createSelector here to minimize thrash

const DEFAULT_TRACKING_CONTEXT = 'default';

const isFetching = (
  state: Reducer.State,
  type: string,
  context: string
) => {
  const key = Utils.State.getStateKey(type, context);
  const record = state.api.loading[key];

  if (!record) {
    return false;
  } else if (record.startFetch && !record.endFetch) {
    return true;
  }

  return false;
};

const lastFetchTime = (
  state: Reducer.State,
  type: string,
  context: string
) => {
  const key = Utils.State.getStateKey(type, context);
  const record = state.api.loading[key];

  if (!record) {
    return -1;
  }
  return record.startFetch;
};

const getError = (
  state: Reducer.State,
  type: string,
  context: string
) => {
  const key = Utils.State.getStateKey(type, context);
  const record = state.api.error[key];

  if (record) {
    return record.error;
  }
  return null;
};

function doGetAPIFetchStatus<P>(
  state: Reducer.State,
  type: string,
  context = DEFAULT_TRACKING_CONTEXT
): Models.APIFetchStatus {
  const loading = isFetching(state, type, context);
  const error = getError(state, type, context);
  const lastTime = lastFetchTime(state, type, context);

  return {
    loading,
    error: error || undefined,
    lastFetchTime: lastTime
  };
}
export const getAPIStatus = doGetAPIFetchStatus;
