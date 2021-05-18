/* eslint-disable jsx-a11y/label-has-associated-control */
// == Import npm
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// == Import
import './styles.scss';
import LinkBox from '../LinkBox';

const qs = require('qs');

// == Composant
const Category = (
  {
    selectedCategoryIndex,
    categories,
    getAllCategories,
  },
) => {
  const [selectedList, setSelectedList] = useState('');

  const [url, setUrl] = useState();
  const listSelected = (e) => {
    const { value } = e.target;
    setSelectedList(value);
  };
  const onChange = (evt) => {
    setUrl(evt.target.value);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios.post('http://localhost:5050/links',
      qs.stringify({
        url,
        list_id: selectedList,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } })
      .then(() => {
        setUrl('');
        getAllCategories();
      })
      .catch((error) => {
        (console.log('error', error.response));
      });
  };
  return (
    <div className="category">
      <div className="app-addUrlDiv">
        <form method="post" className="app-selectForm">
          <label htmlFor="list-select" className="app-labels">Choose a list:</label>
          <select name="lists" id="list-select" onChange={listSelected}>
            <option value="">Please choose a list</option>
            {categories[selectedCategoryIndex].list.length
                && categories[selectedCategoryIndex].list.map((selectList) => (
                  <option key={selectList.id} value={selectList.id}>{selectList.name}</option>
                ))}
          </select>
        </form>
        <form method="post" className="app-formInput" onSubmit={handleSubmit}>
          <input
            type="text"
            value={url}
            name="url"
            className="app-input"
            placeholder="Paste url here"
            onChange={onChange}
          />
        </form>
      </div>
      {categories[selectedCategoryIndex]
          && Object.keys(categories[selectedCategoryIndex]).length && (
            <div className="app-listsContainer">
              {categories[selectedCategoryIndex].list.map((listBoxes) => (
                <div key={listBoxes.id} className="app-listBox">
                  <h2 className="app-listBox-title">{listBoxes.name}</h2>
                  <div className="app-listBox-linksContainer">
                    {listBoxes.links && Object.keys(listBoxes.links).length ? (
                      listBoxes.links.map((link) => (
                        <LinkBox
                          key={link.id}
                          link={link}
                          id={link.id}
                          getAllCategories={getAllCategories}
                        />
                      ))
                    ) : (

                      <h2 className="app-loading">Loading</h2>

                    )}
                  </div>
                </div>
              ))}
            </div>
      )}
    </div>
  );
};

// == Export
export default Category;
