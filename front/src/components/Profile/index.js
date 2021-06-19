import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';
import Page from '../../containers/Page';
import LinkForm from '../../containers/LinkForm';

const Profile = () => (
  <Page>
    <div className="profile">
      <LinkForm />
      <h2 className="profile__header">PROFILE</h2>
    </div>
  </Page>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Profile;
