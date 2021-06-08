import React from 'react';

import AppHeader from '../AppHeader';
import Content from '../Content';
import Page from '../Page';

const Error = () => (
  <Page>
    <AppHeader />
    <Content
      title="Erreur"
      text="Nous sommes désolé, Une erreur s'est produite."
    />
  </Page>
);

export default Error;
