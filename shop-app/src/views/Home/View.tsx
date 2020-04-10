import './scss/index.scss';

import * as React from 'react';

import { Models } from '../../common/models';
import { MetaWrapper } from '../../components';
import Page from './Page';

type Props = {
  home: Models.HomePage | null;
  apiStatus: Models.APIFetchStatus;
}
const View: React.FC<Props> = (props: Props) => (
  <div className="home-page">
          <MetaWrapper
            meta={{
              description: props.home ? props.home.description : "",
              title: props.home ? props.home.name : "",
            }}
          >
            <Page
              apiStatus={props.apiStatus}
              home={props.home}
            />
          </MetaWrapper>
        );
  </div>
);

export default View;
