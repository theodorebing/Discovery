import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from '../../api';
import Input from '../Input';

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
          setConfirmationMessage(`category ${newCategory} created`);
          closeInput();
        }
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error);
      });
  };
  return (
    <form action="" className="form-form newInput" onSubmit={handleSubmitNewCategory}>
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
      <p onClick={closeInput} className="newInput-close">close</p>
    </form>
  );
};

CreateNewCategoryInput.propTypes = {
  setCategoryInputOpen: PropTypes.func.isRequired,
  setConfirmationMessage: PropTypes.func.isRequired,
};

export default CreateNewCategoryInput;
