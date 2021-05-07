// == Import npm
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// == Import

import './styles.scss';
import LinkBox from '../LinkBox';

// == Composant
const App = () => {
  const [link, setLink] = useState();
  const [url, setUrl] = useState('');
  const errorMessage = false;
  const onChange = (evt) => {
    console.log('evt.target.value', evt.target.value);
    setUrl(evt.target.value);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log('url', url);
    axios.get(`http://api.linkpreview.net/?key=881162a141e99a69629e7a4a4661a633&q=${url}`)
      .then((result) => {
        if (result && result.data) {
          setLink(result.data);
          setUrl('');
        }
      })
      .catch((error) => {
        errorMessage = true;
        (console.log('cath tree', error));
      });
  };

  // useEffect(() => {
  //   axios.get(`http://api.linkpreview.net/?key=881162a141e99a69629e7a4a4661a633&q=${url}`)
  //     .then((result) => {
  //       if (result && result.data) {
  //         setLink(result.data);
  //       }
  //     })
  //     .catch((error) => {
  //       (console.log('cath tree', error));
  //     });
  // }, []);
  console.log('link', link);
  console.log('url', url);
  return (
    <div className="app">
      <h1 className="app-title">Discovery</h1>
      {errorMessage && (
        <div>Il y a eu une erreur</div>
      )}
      <form method="post" className="app-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          name="url"
          className="app-input"
          placeholder="Paste url here"
          onChange={onChange}
        />
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
