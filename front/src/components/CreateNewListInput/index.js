import React, { useState } from 'react';
import axios from '../../api';
import Input from '../Input';

import './styles.scss';

const qs = require('qs');

const CreateNewListInput = ({ setListInputOpen, categoryId }) => {
  const [newList, setNewList] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const onChangeNewList = (value) => {
    setNewList(value);
  };
  const closeInput = () => {
    setListInputOpen(false);
  };
  const handleSubmitNewList = (evt) => {
    evt.preventDefault();
    axios.post(`categories/${categoryId}/lists`,
      qs.stringify({ name: newList }))
      .then((result) => {
        if (result && result.data) {
          console.log(result.data);
          closeInput();
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data.error);
      });
  };
  return (
    <form action="" className="form-form newCategory" onSubmit={handleSubmitNewList}>
      {errorMessage && (
      <p className="errorMessage">{errorMessage}</p>
      )}
      <Input
        label="give a name to this new list"
        className="CategoryInput"
        onChange={onChangeNewList}
        value={newList}
        name="list"
      />
      <p onClick={closeInput} className="newCategory-close">close</p>
    </form>
  );
};

export default CreateNewListInput;
