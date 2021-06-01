import React, { useEffect, useState } from 'react';
import Input from '../Input';
import Select from '../Select';
import axios from '../../api';

const qs = require('qs');

const LinkForm = ({
  onChangeLink, openLinkForm, linkFormOpened, link,
}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    openLinkForm();
  };
  const [categories, setCategories] = useState({});
  const [categoryId, setCategoryId] = useState(null);
  useEffect(() => {
    axios.get('categories')
      .then((result) => {
        if (result && result.data) {
          setCategories(result.data);
        }
      })
      .catch((error) => {
        (console.log('error', error));
      });
  }, []);
  const categorySelected = (evt) => {
    setCategoryId(evt.target.value);
  };

  const [lists, setLists] = useState(null);
  const [listId, setListId] = useState(null);
  const getListsFromSelectedCategory = () => {
    axios.get(`categories/${categoryId}/lists`)
      .then((result) => {
        if (result && result.data) {
          console.log('result', result);
          setLists(result.data);
        }
      })
      .catch((error) => {
        (console.log('error', error));
      });
  };
  if (categoryId) {
    getListsFromSelectedCategory();
  }

  const listSelected = (evt) => {
    setListId(evt.target.value);
  };
  if (lists) {
    console.log('lists', lists);
  }

  return (
    <div className="linkForm">
      <form action="" className="form-form" onSubmit={handleSubmit}>
        <Input
          label="paste your link here"
          className="linkInput"
          onChange={onChangeLink}
          value={link}
          name="link"
        />
      </form>
      {linkFormOpened && (
        <>
          {categories.length ? (
            <>
              <Select
                values={categories}
                name="category"
                label="choose a category"
                valueSelected={categorySelected}
              />
              {categoryId && lists ? (
                <Select
                  values={lists}
                  name="list"
                  label="choose a list"
                  valueSelected={listSelected}
                />
              ) : (
                <p>Create a list</p>
              )}
            </>
          ) : (
            <p>Create a category</p>
          )}
        </>
      )}
    </div>
  );
};

export default LinkForm;
