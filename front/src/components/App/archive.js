/* eslint-disable jsx-a11y/label-has-associated-control */
// == Import npm
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Route,
  Switch,
  Link,
} from 'react-router-dom';

// == Import
import LinkBox from '../LinkBox';
import './styles.scss';
// import Categories from '../Categories';
import CreateCategory from '../CreateCategory';

const qs = require('qs');
// import Category from '../Category/index';

// == Composant
const App = () => {
// states
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState();
  const [selectedList, setSelectedList] = useState('');
  const [showListSelector, setShowListSelector] = useState(false);
  const [url, setUrl] = useState();
  // variables
  // functions
  const getAllCategories = () => {
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
      .then(() => {
        setUrl('');
        getAllCategories();
      })
      .catch((error) => {
        (console.log('error', error.response));
      });
  };
  const categorySelected = (e) => {
    const { value } = e.target;
    if (categories.find((category) => category.name === value)) {
      const isSelectedCategory = (element) => element.name === value;
      setSelectedCategoryIndex(categories.findIndex(isSelectedCategory));
      setShowListSelector(true);
    }
    else {
      setSelectedCategoryIndex();
      setShowListSelector(false);
    }
  };

  // useEffect
  useEffect(() => {
    getAllCategories();
  }, []);
  // rendering
  return (
    <div className="app">
      <a href="/">
        <h1 className="app-title">the link</h1>
      </a>
      {/* <Switch>
        <Route exact path="/"> */}
      <form method="post" className="app-selectForm">
        <label htmlFor="category-select" className="app-labels">Choose a category:</label>
        <select name="categories" id="category-select" className="app-categories" onChange={categorySelected}>
          <option value="">Please choose a category</option>
          {categories.length && categories.map((category) => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}
        </select>
      </form>

      {/* <Categories categories={categories} categorySelected={categorySelected} /> */}

      {/* <div className="categories">
            <div>
              <div className="categories-menu">
                {categories.map((category) => (
                  <a
                    key={category.id}
                    value={category.name}
                    className="categories-link"
                    onClick={categorySelected}
                    href={`/category/${category.id}`}
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            </div>
            <div className="categories-createLink">
              <Link to="/createCategory">Create a new category</Link>
            </div>
          </div> */}
      {/* </Route>
        <Route path="/createCategory">
          <CreateCategory />
        </Route>
        <Route path="/category/:id"> */}
      {showListSelector && (
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
      )};

      {/* <Category
            selectedCategoryIndex={selectedCategoryIndex}
            categories={categories}
            getAllCategories={getAllCategories}
          /> */}
      {/* {showListSelector && (
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
          )}
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
          )} */}
      {/* </Route>
      </Switch> */}
    </div>
  );
};

// == Export
export default App;
