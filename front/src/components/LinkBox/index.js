// == Import npm
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// == Import

import './styles.scss';

// == Composant
const LinkBox = ({ link, id, getAllCategories }) => {
  const [linkDatas, setLinkDatas] = useState();
  const deleteLink = () => {
    axios.delete(`http://localhost:5050/links/${id}`)
      .then(() => {
        getAllCategories();
      });
  };
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
        <div className="linkBox">
          <a href={linkDatas.url} target="_blank" rel="noreferrer" className="linkBox-a">
            <img src={linkDatas.image} alt="link" className="linkBox-image" />
            <div className="linkBox-texts">
              <div className="linkBox-description linkBox-text">Description : {linkDatas.description}</div>
              <div className="linkBox-title linkBox-text">Title : {linkDatas.title}</div>
              <div className="linkBox-sitename linkBox-text">Source : {linkDatas.site_name}</div>
              <div className="linkBox-url linkBox-text dont-break-out">url : {linkDatas.url}</div>
            </div>
          </a>
          <div onClick={deleteLink}>x</div>

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
