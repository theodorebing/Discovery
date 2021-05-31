import React from 'react';
import Page from 'src/components/Page';
import './styles.scss';
import axios from 'src/api';

const Categories = ({ handleLogout }) => {
  const deconnect = () => {
    axios.get('logout')
      .then(() => handleLogout());
  };
  return (
    <Page>
      <div className="categories">
        <p>Test</p>
        <button type="button" onClick={deconnect}>
          Déconnexion
        </button>
      </div>
    </Page>
  );
};
export default Categories;
