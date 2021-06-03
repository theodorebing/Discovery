import React from 'react';
import axios from 'src/api';
import './styles.scss';

const Logout = ({ handleLogout, closeLinkForm }) => {
  const deconnect = () => {
    axios.get('logout')
      .then(() => {
        handleLogout();
        closeLinkForm();
      });
  };
  return (
    <div className="logout-button">
      <button type="button" onClick={deconnect}>
        Déconnexion
      </button>
    </div>
  );
};
export default Logout;
