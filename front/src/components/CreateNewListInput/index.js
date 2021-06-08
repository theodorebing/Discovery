import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from '../../api';
import Input from '../Input';

const qs = require('qs');

const CreateNewListInput = ({ setListInputOpen, categoryId, setConfirmationMessage }) => {
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
          setConfirmationMessage(`list ${newList} created`);
          closeInput();
        }
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error);
      });
  };
  return (
    <form action="" className="form-form newInput" onSubmit={handleSubmitNewList}>
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
      <p onClick={closeInput} className="newInput-close">close</p>
    </form>
  );
};

CreateNewListInput.propTypes = {
  setListInputOpen: PropTypes.func.isRequired,
  categoryId: PropTypes.string.isRequired,
  setConfirmationMessage: PropTypes.func.isRequired,
};

export default CreateNewListInput;
