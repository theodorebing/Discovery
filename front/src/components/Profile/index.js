import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from '../../api';

import './styles.scss';
import Page from '../../containers/Page';
import LinkForm from '../../containers/LinkForm';

const Profile = () => {
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get('account')
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  }, []);
  return (
    <Page>
      <div className="profile">
        <LinkForm />

        <h2 className="profile__header">PROFILE</h2>
        {!errorMessage && user && (
        <>
          <h3 className="profile__name">{user.name}</h3>
          <h3 className="profile__name">{user.email}</h3>
          <h3 className="profile__name">{user.created_at}</h3>
          <h3 className="profile__name">{user.updated_at}</h3>
        </>
        )}
        {errorMessage && (
          <p className="profile__errorMessage">{errorMessage}</p>
        )}
      </div>
    </Page>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Profile;
