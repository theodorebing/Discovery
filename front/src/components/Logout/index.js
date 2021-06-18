import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'src/api';
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
        Déconnexion
      </a>
    </div>
  );
};
export default Logout;
