// == Import npm
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// == Import

import './styles.scss';
import LinkBox from '../LinkBox';

const qs = require('qs');

// == Composant
const App = () => {
// states
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState();
  const [selectedList, setSelectedList] = useState('');
  const [showListSelector, setShowListSelector] = useState(false);
  const [links, setLinks] = useState([]);
  const [url, setUrl] = useState();
  // variables
  const errorMessage = false;
  // functions
  const getListsFromSelectedCategory = () => {
    axios.get('http://localhost:5050/lists/1/links')
      .then((result) => {
        if (result && result.data) {
          setLinks(result.data);
        }
      })
      .catch((error) => {
        (console.log('cath tree', error));
      });
  };
  const categorySelected = (e) => {
    const { value } = e.target;
    if (categories.find((category) => category.name === value)) {
      const isSelectedCategory = (element) => element.name === value;
      setSelectedCategoryIndex(categories.findIndex(isSelectedCategory));
      setShowListSelector(true);
      getListsFromSelectedCategory();
    }
    else {
      setSelectedCategoryIndex();
      setShowListSelector(false);
    }
  };
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
      .then((result) => {
        console.log('request ok', result);
      })
      .catch((error) => {
        (console.log('error', error.response));
      });
    setUrl('');
    // getListsFromSelectedCategory().setTimeout(500);
  };
  // useEffect
  useEffect(() => {
    // get all categories
    axios.get('http://localhost:5050/categories')
      .then((result) => {
        if (result && result.data) {
          setCategories(result.data);
        }
      })
      .catch((error) => {
        setCategories('There is no category');
      });
  }, []);
  // rendering
  return (
    <div className="app">
      <h1 className="app-title">Discovery</h1>
      {errorMessage && (
        <div>Il y a eu une erreur</div>
      )}
      <form method="post" className="app-selectform">
        <label htmlFor="category-select">Choose a category:
          <select name="categories" id="category-select" onChange={categorySelected}>
            <option value="">Please choose a category</option>
            {categories.length && categories.map((category) => (
              <option key={category.id} value={category.name}>{category.name}</option>
            ))}
          </select>
        </label>
      </form>
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
      {showListSelector && (
        <form method="post" className="app-selectform">
          <label htmlFor="list-select">Choose a list:
            <select name="lists" id="list-select" onChange={listSelected}>
              <option value="">Please choose a list</option>
              {categories[selectedCategoryIndex].list.length
              && categories[selectedCategoryIndex].list.map((selectList) => (
                <option key={selectList.id} value={selectList.id}>{selectList.name}</option>
              ))}
            </select>
          </label>
        </form>
      )}
      {categories[selectedCategoryIndex]
      && Object.keys(categories[selectedCategoryIndex]).length ? (
        <>
          {categories[selectedCategoryIndex].list.map((listBoxes) => (
            <div key={listBoxes.id} className="app-listBox">
              <h2 className="app-listBox-title">{listBoxes.name}</h2>
              {listBoxes.links && Object.keys(listBoxes.links).length ? (
                listBoxes.links.map((link) => (
                  <LinkBox key={link.url} link={link} />
                ))
              ) : (
                <h2 className="tree-flex-loading">Loading</h2>
              )}
            </div>
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
