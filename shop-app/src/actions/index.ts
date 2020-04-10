import { GetHomePage } from './api/Home';
import { Tracking } from './api/Tracking';

export { GetHomePage } from './api/Home';
export { Tracking } from './api/Tracking';

export { ActionTypes } from './ActionTypes';
export type Actions = 
  | GetHomePage.Request
  | GetHomePage.Success
  | GetHomePage.Failure
  | Tracking.TrackAPIStart
  | Tracking.TrackAPIError
  | Tracking.TrackAPIComplete
  | Tracking.TrackAPIClearError;