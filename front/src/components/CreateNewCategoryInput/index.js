import React, { useState } from 'react';
import axios from '../../api';
import Input from '../Input';

import './styles.scss';

const qs = require('qs');

const CreateNewCategoryInput = ({ setCategoryInputOpen, setConfirmationMessage }) => {
  const [newCategory, setNewCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const onChangeNewCategory = (value) => {
    setNewCategory(value);
  };
  const closeInput = () => {
    setCategoryInputOpen(false);
  };
  const handleSubmitNewCategory = (evt) => {
    evt.preventDefault();
    axios.post('categories',
      qs.stringify({ name: newCategory }))
      .then((result) => {
        if (result && result.data) {
          console.log(result.data);
          setConfirmationMessage(`category ${newCategory} created`);
          closeInput();
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data.error);
      });
  };
  console.log(newCategory);
  return (
    <form action="" className="form-form newCategory" onSubmit={handleSubmitNewCategory}>
      {errorMessage && (
      <p className="errorMessage">{errorMessage}</p>
      )}
      <Input
        label="give a name to this new category"
        className="categoryInput"
        onChange={onChangeNewCategory}
        value={newCategory}
        name="category"
      />
      <p onClick={closeInput} className="newCategory-close">close</p>
    </form>
  );
};

export default CreateNewCategoryInput;
