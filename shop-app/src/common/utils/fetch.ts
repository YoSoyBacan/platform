import { ErrorPayload } from '../';


const PLATFORM_HEADER = 'X-PLATFORM-HEADER';

export class FetchError extends Error {
  private _status: number;
  // private _response: Response;
  private _body: any;

  constructor(message: string, body?: ErrorPayload.RequestFailure) {
    super(message);
    // this._response = response;
    this._body = body;
    /* Manually set the prototype for this object to FetchError. This was broken as of Typescript 2.1. See:
     * https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#
        extending-built-ins-like-error-array-and-map-may-no-longer-work
     */
    (this as any).__proto__ = FetchError.prototype;
  }

  get status() {
    return this._status;
  }

  // get response() {
  //   return this._response;
  // }

  set body(body: ErrorPayload.RequestFailure) {
    this._body = body;
  }

  get body() {
    return this._body;
  }
}

export interface FetchOptions {
  redirectOnAuthFailure?: boolean;
  idempotentKey?: string;
}


function isJsonBody(response: Response) {
  const contentType = response.headers.get('Content-Type');
  return contentType ? contentType.indexOf('application/json') === 0 : false;
}

function checkStatus(response: Response, fetchOpts?: FetchOptions) {
  // response.ok: Contains a boolean stating whether the response was successful (status in the range 200-299) or not.
  if (response.ok) {
    // refreshSession();
    return response;
  } else if (
    response.status === 401 &&
    (!fetchOpts || (fetchOpts && fetchOpts.redirectOnAuthFailure))
  ) {
    window.location.href = `/login?redirect=${encodeURIComponent('/relayhq')}`;
  } else {
    // refreshSession();
    const error = new FetchError(response.statusText);

    if (isJsonBody(response)) {
      return (response as any)
        .json()
        .then((body: ErrorPayload.RequestFailure) => {
          error.body = body;
        })
        .catch((err: Error) => {
          // Catch any error processing the response and convert it into a generic message
          const normalized: ErrorPayload.RequestFailure = {
            code: ErrorPayload.ResponseCode.ERROR_UNKNOWN,
            error: true,
            referenceId: '',
            message: response.statusText
          };
          error.body = normalized;
        })
        .finally(() => {
          throw error;
        });
    } else {
      const normalized: ErrorPayload.RequestFailure = {
        code: ErrorPayload.ResponseCode.ERROR_UNKNOWN,
        error: true,
        referenceId: '',
        message: response.statusText
      };
      error.body = normalized;
      throw error;
    }
  }
}


export async function get<T>(endpoint: string, fetchOpts?: FetchOptions) {
  const opts = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      [PLATFORM_HEADER]: 'web'
    },
    credentials: 'include' as any
  };
  return fetch(`${endpoint}`, opts)
    .then((response: Response) => checkStatus(response, fetchOpts))
    .then((response: Response) =>
      isJsonBody(response) ? response.json() : response.text()
    )
    .then((body: any) => body as T);
}