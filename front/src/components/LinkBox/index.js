// == Import npm
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// == Import

import './styles.scss';

// == Composant
const LinkBox = ({ link }) => {
  const [linkDatas, setLinkDatas] = useState();
  useEffect(() => {
    axios.get(`http://api.linkpreview.net/?key=881162a141e99a69629e7a4a4661a633&fields=site_name&q=${link.url}`)
      .then((result) => {
        if (result && result.data) {
          setLinkDatas(result.data);
        }
      })
      .catch((error) => {
        (console.error('cath tree', error));
      });
  }, []);
  return (
    <>
      {linkDatas && Object.keys(linkDatas).length && (
        <div className="linkBox-mainDiv">
          <a href={linkDatas.url} className="linkBox">
            <img src={linkDatas.image} alt="link" className="linkBox-image" />
            <div className="linkBox-texts">
              <div className="linkBox-description linkBox-text">Description : {linkDatas.description}</div>
              <div className="linkBox-title linkBox-text">Title : {linkDatas.title}</div>
              <div className="linkBox-sitename linkBox-text">Source : {linkDatas.site_name}</div>
              <div className="linkBox-url linkBox-text dont-break-out">url : {linkDatas.url}</div>
            </div>
          </a>
        </div>
      )}
    </>
  );
};

LinkBox.propTypes = {
  link: PropTypes.object,
};

LinkBox.defaultProps = {
  link: {},
};

// == Export
export default LinkBox;
