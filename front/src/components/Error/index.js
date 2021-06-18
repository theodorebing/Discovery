import React from 'react';

import Logout from '../Logout';
import Content from '../Content';
import Page from '../../containers/Page';

const Error = () => (
  <Page>
    <Content
      title="404 not found"
      text="your are not linked to anything existing, try again"
    />
    {/* <Logout /> */}
  </Page>
);

export default Error;
