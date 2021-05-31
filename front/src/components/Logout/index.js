import React from 'react';
import axios from 'src/api';

const Logout = ({ handleLogout }) => {
  const deconnect = () => {
    axios.get('logout')
      .then(() => handleLogout());
  };
  return (
    <button type="button" onClick={deconnect}>
      Déconnexion
    </button>
  );
};
export default Logout;
