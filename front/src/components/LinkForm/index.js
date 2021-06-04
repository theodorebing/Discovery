import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import Select from '../Select';
import CreateNewCategoryInput from '../CreateNewCategoryInput';
import CreateNewListInput from '../CreateNewListInput';
import axios from '../../api';

import './styles.scss';

const qs = require('qs');

const LinkForm = ({
  onChangeLink, openLinkForm, closeLinkForm, linkFormOpened, link,
}) => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [lists, setLists] = useState([]);
  const [listId, setListId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [categoryInputOpen, setCategoryInputOpen] = useState(false);
  const [listInputOpen, setListInputOpen] = useState(false);
  const handleSubmitLink = (evt) => {
    evt.preventDefault();
    openLinkForm();
  };

  const url = link;

  const resetForm = () => {
    setCategoryId(null);
    setListId(null);
    setErrorMessage('');
    setConfirmationMessage('');
    setCategoryInputOpen(false);
    setListInputOpen(false);
  };

  const closeAndResetForm = () => {
    closeLinkForm();
    resetForm();
  };

  const handleSubmitForm = (evt) => {
    evt.preventDefault();
    axios.post('links',
      qs.stringify({ url, list_id: listId }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } })
      .then((result) => {
        if (result) {
          closeAndResetForm();
        }
      })
      .catch((error) => {
        setErrorMessage('There is a problem with your link');
      });
  };

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

  const categorySelected = (evt) => {
    setCategoryId(evt.target.value);
  };

  const listSelected = (evt) => {
    setListId(evt.target.value);
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
  }, [categoryId, categoryInputOpen, listId, listInputOpen]);

  const openCategoryInput = () => {
    setCategoryInputOpen(true);
  };

  const openListInput = () => {
    setListInputOpen(true);
  };

  return (
    <div className="linkForm">
      <form action="" className="form-form" onSubmit={handleSubmitLink}>
        <Input
          label="paste your link here"
          className="linkInput"
          onChange={onChangeLink}
          value={link}
          name="link"
        />
      </form>
      {linkFormOpened && (
        <div className="linkForm-part2">
          {errorMessage && (
            <p className="errorMessage">{errorMessage}</p>
          )}
          {confirmationMessage && (
            <p className="confirmationMessage">{confirmationMessage}</p>
          )}
            {!categoryInputOpen ? (
              <div className="linkForm-part2-div">
                <Select
                  values={categories}
                  name="category"
                  label="choose a category"
                  valueSelected={categorySelected}
                />
                <p
                  className="linkForm-part2-create"
                  onClick={openCategoryInput}
                >or create a category +
                </p>
              </div>
            ) : (
              <CreateNewCategoryInput
                setCategoryInputOpen={setCategoryInputOpen}
                setCategoryId={setCategoryId}
                setConfirmationMessage={setConfirmationMessage}
              />
            )}
            {categoryId && (
            <>
              {!listInputOpen ? (
                <div className="linkForm-part2-div">
                  <Select
                    values={lists}
                    name="list"
                    label="choose a list"
                    valueSelected={listSelected}
                  />
                  <p
                    className="linkForm-part2-create"
                    onClick={openListInput}
                  >or create a list +
                  </p>
                </div>
              ) : (
                <CreateNewListInput
                  setListInputOpen={setListInputOpen}
                  setListId={setListId}
                  categoryId={categoryId}
                  setConfirmationMessage={setConfirmationMessage}
                />
              )}
            </>
            )}
            {listId && (
              <div className="linkForm-part2-div">
                <button type="button" onClick={handleSubmitForm}>
                  create the link
                </button>
              </div>
            )}
          <p onClick={closeAndResetForm} className="newInput-close">cancel</p>
        </div>
      )}
    </div>
  );
};

LinkForm.propTypes = {
  onChangeLink: PropTypes.func.isRequired,
  openLinkForm: PropTypes.func.isRequired,
  closeLinkForm: PropTypes.func.isRequired,
  linkFormOpened: PropTypes.bool.isRequired,
  link: PropTypes.string,
};

LinkForm.defaultProps = {
  link: '',
};

export default LinkForm;
