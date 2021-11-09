import React from 'react';
import Content from '../Content';
import Page from '../../containers/Page';
import LinkForm from '../../containers/LinkForm';
import './styles.scss';

const Error = () => (
  <Page>
    <div className="error">
      <LinkForm />
      <Content
        title="404 not found"
        text="your are not linked to anything existing, try again"
      />
    </div>
  </Page>
);

export default Error;
