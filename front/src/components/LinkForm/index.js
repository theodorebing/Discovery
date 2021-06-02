import React, { useEffect, useState } from 'react';
import Input from '../Input';
import Select from '../Select';
import axios from '../../api';

const LinkForm = ({
  onChangeLink, openLinkForm, linkFormOpened, link,
}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    openLinkForm();
  };
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [lists, setLists] = useState([]);
  const [listId, setListId] = useState(null);
  const getListsFromSelectedCategory = async () => {
    await (
      axios.get(`categories/${categoryId}/lists`)
        .then((result) => {
          if (result && result.data) {
            console.log('result', result);
            setLists(result.data);
            return result;
          }
        })
        .catch((error) => {
          (console.log('error', error));
          setLists([]);
        })
    );
  };

  const listSelected = (evt) => {
    setListId(evt.target.value);
  };

  const categorySelected = (evt) => {
    setCategoryId(evt.target.value);
  };

  useEffect(() => {
    axios.get('categories')
      .then((result) => {
        if (result && result.data) {
          setCategories(result.data);
        }
      })
      .catch((error) => {
        (console.log('error', error));
        setCategories([]);
      });
    if (categoryId) {
      getListsFromSelectedCategory();
    }
  }, [categoryId]);

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
          <Select
            values={categories}
            name="category"
            label="choose a category"
            valueSelected={categorySelected}
          />
          <p>Create a category</p>
          {categoryId && (
          <>
            <Select
              values={lists}
              name="list"
              label="choose a list"
              valueSelected={listSelected}
            />
            <p>Create a list</p>
          </>
          )}

        </>
      )}
    </div>
  );
};

export default LinkForm;
