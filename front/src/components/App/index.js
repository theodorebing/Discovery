// == Import npm
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// == Import

import './styles.scss';
import LinkBox from '../LinkBox';

const qs = require('qs');

// == Composant
const App = () => {
  const [links, setLinks] = useState([]);
  const [url, setUrl] = useState();
  const errorMessage = false;
  useEffect(() => {
    axios.get('http://localhost:5050/lists/1/links')
      .then((result) => {
        if (result && result.data) {
          const urlsFromApi = result.data;
          urlsFromApi.forEach((urlFromApi) => (
            (axios.get(`http://api.linkpreview.net/?key=881162a141e99a69629e7a4a4661a633&q=${urlFromApi.url}`)
              .then((getLinksData) => {
                if (getLinksData && getLinksData.data) {
                  setLinks([...links, getLinksData.data]);
                }
              })
              .catch((error) => {
                (console.error('error', error));
              }))
          ));
        }
      })
      .catch((error) => {
        (console.log('cath tree', error));
      });
  }, []);

  const onChange = (evt) => {
    setUrl(evt.target.value);
  };
  const list = 1;
  const handleSubmit = (evt) => {
    evt.preventDefault();

    axios.post('http://localhost:5050/links',
      qs.stringify({
        url,
        list_id: list,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } })
      .then((result) => {
        console.log('request ok', result);
      })
      .catch((error) => {
        (console.log('error', error.response));
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
      {links && Object.keys(links).length ? (
        <>
          {links.map((link) => (
            <>
              <LinkBox key={link.url} link={link} />
            </>
          ))}
        </>
      ) : (
        <h2 className="tree-flex-loading">Loading</h2>
      )}
    </div>
  );
};

// == Export
export default App;
