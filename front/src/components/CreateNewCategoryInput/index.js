import React, { useState } from 'react';
import axios from '../../api';
import Input from '../Input';

const qs = require('qs');

const CreateNewCategoryInput = ({ setInputOpen }) => {
  const [newCategory, setNewCategory] = useState('');
  const onChangeNewCategory = (value) => {
    setNewCategory(value);
  };
  const closeInput = () => {
    setInputOpen(false);
  };
  const handleSubmitNewCategory = (evt) => {
    evt.preventDefault();
    axios.post('categories',
      { newCategory })
      .then((result) => {
        if (result) {
          console.log(result);
          // setInputOpen(false);
        }
      })
      .catch((error) => {
        console.log(error.message);
        // setErrorMessage('There is a problem with your link');
      });
  };
  console.log(newCategory);
  return (
    <form action="" className="form-form" onSubmit={handleSubmitNewCategory}>
      <Input
        label="give a name to this new category"
        className="categoryInput"
        onChange={onChangeNewCategory}
        value={newCategory}
        name="category"
      />
      <p onClick={closeInput} className="linkForm-part2-create">Return</p>
    </form>
  );
};

export default CreateNewCategoryInput;
