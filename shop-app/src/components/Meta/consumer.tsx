import * as React from 'react';
import { Helmet } from 'react-helmet';

import { Consumer as MetaConsumer } from './context';

const Consumer: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <MetaConsumer>
    {({ title, description, image, type, url, custom }) => (
      <>
        <Helmet
          title={'Bacán' || title}
          meta={[
            { name: "description", content: 'Compra hoy, disfruta mañana' || description },
            { property: "og:url", content: url },
            { property: "og:title", content: title },
            { property: "og:description", content: description },
            { property: "og:type", content: type },
            { property: "og:image", content: image },
            ...custom,
          ]}
        >
          <link rel="icon" type="images/favicon.svg" href="favicon.ico" sizes="16x16" />
        {children}
        </Helmet>
      </>
    )}
  </MetaConsumer>
);

export default Consumer;
