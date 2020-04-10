import { ActionTypes } from '..';
import { FetchError } from '../../common/utils/fetch';

export const DEFAULT_TRACKING_CONTEXT = 'workbench';

export namespace Tracking {
  interface TrackAPIStatus<T, P> {
    type: T;
    payload: P;
    error?: FetchError;
  }

  interface TrackAPIPayload {
    entity: string;
    context: string;
  }
  export type TrackAPIStart = TrackAPIStatus<
    ActionTypes.API_REQUEST_START,
    TrackAPIPayload
  >;
  export function start(entity: string, context: string): TrackAPIStart {
    return {
      type: ActionTypes.API_REQUEST_START,
      payload: { entity, context }
    };
  }

  export type TrackAPIComplete = TrackAPIStatus<
    ActionTypes.API_REQUEST_COMPLETE,
    TrackAPIPayload
  >;
  export function complete(entity: string, context: string): TrackAPIComplete {
    return {
      type: ActionTypes.API_REQUEST_COMPLETE,
      payload: { entity, context }
    };
  }

  export type TrackAPIError = TrackAPIStatus<
    ActionTypes.API_REQUEST_ERROR,
    TrackAPIPayload
  >;
  export function error(
    entity: string,
    context: string,
    err: FetchError
  ): TrackAPIError {
    return {
      type: ActionTypes.API_REQUEST_ERROR,
      payload: { entity, context },
      error: err
    };
  }

  export type TrackAPIClearError = TrackAPIStatus<
    ActionTypes.API_CLEAR_ERRORS,
    TrackAPIPayload
  >;
  export function clearErrors(
    entity: string,
    context?: string
  ): TrackAPIClearError {
    return {
      type: ActionTypes.API_CLEAR_ERRORS,
      payload: { entity, context: context || DEFAULT_TRACKING_CONTEXT }
    };
  }
}
