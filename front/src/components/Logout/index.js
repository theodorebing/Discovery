import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from '../../api';
import './styles.scss';

const Logout = ({ handleLogout, closeLinkForm }) => {
  const history = useHistory();
  const deconnect = () => {
    history.push('/');
    axios.get('logout')
      .then(() => {
        handleLogout();
        closeLinkForm();
      });
  };
  return (
    <div className="logout-button">
      <a onClick={deconnect}>
        Logout
      </a>
    </div>
  );
};

Logout.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  closeLinkForm: PropTypes.func.isRequired,
};

export default Logout;
