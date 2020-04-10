import { Models } from '../common/models';
import { Utils } from '../common/utils';

export namespace Home {
  export type GET = Models.HomePage;
  export namespace GET {
    export const relayUser = () => {
      return Utils.Fetch.get<Home.GET>('/api/shop');
    };
  }
}