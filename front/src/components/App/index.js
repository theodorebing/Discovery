// == Import npm
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// == Import

import './styles.scss';
import LinkBox from '../LinkBox';

// == Composant
const App = () => {
  const [link, setLink] = useState();
  const handleSubmit = (evt) => {
    evt.preventDefault();
  };
  useEffect(() => {
    axios.get('http://api.linkpreview.net/?key=881162a141e99a69629e7a4a4661a633&q=https://deezer.page.link/goEKkaqejxYMs9XZ6')
      .then((result) => {
        if (result && result.data) {
          setLink(result.data);
        }
      })
      .catch((error) => {
        (console.log('cath tree', error));
      });
  }, []);
  console.log('link', link);
  return (
    <div className="app">
      <h1 className="app-title">Discovery</h1>
      <form method="post" className="app-form" onSubmit={handleSubmit}>
        <input type="text" className="app-input" />
      </form>
      {link && Object.keys(link).length ? (
        <LinkBox link={link} />
      ) : (
        <h2 className="tree-flex-loading">Loading</h2>
      )}
    </div>
  );
};

// == Export
export default App;
