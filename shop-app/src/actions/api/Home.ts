import { ErrorPayload, Models } from '../../common';
import { ActionTypes } from '../ActionTypes';

interface HomeEvent<T, P> {
  type: T;
  payload: P;
}

export namespace GetHomePage {
  export type Request = HomeEvent<
    ActionTypes.GET_HOME_PAGE_REQUEST, {}
  >;

  export function request(): Request {
    return {
      payload: {},
      type: ActionTypes.GET_HOME_PAGE_REQUEST,
    }
  }

  export type Success = HomeEvent<
    ActionTypes.GET_HOME_PAGE_SUCCESS,
    Models.HomePage
  >
  export function success(payload: Models.HomePage): Success {
    return {
      payload,
      type: ActionTypes.GET_HOME_PAGE_SUCCESS,
    }
  }

  export type Failure = HomeEvent<
    ActionTypes.GET_HOME_PAGE_FAILURE,
    ErrorPayload.RequestFailure
  >;

  export function failure(payload: ErrorPayload.RequestFailure): Failure {
    return {
      payload,
      type: ActionTypes.GET_HOME_PAGE_FAILURE,
    };
  }
}