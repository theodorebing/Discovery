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
  const [categories, setCategories] = useState({});
  const [category, setCategory] = useState(null);
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
    setCategory(evt.target.value);
  };
  if (category) {
    console.log(category);
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
            <Select
              values={categories}
              name="category"
              label="choose a category"
              valueSelected={categorySelected}
            />
          ) : (
            <p>Create a category</p>
          )}
        </>
      )}
    </div>
  );
};

export default LinkForm;
