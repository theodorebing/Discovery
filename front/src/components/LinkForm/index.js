import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import Select from '../Select';
import CreateNewCategoryInput from '../CreateNewCategoryInput';
import CreateNewListInput from '../CreateNewListInput';
import Button from '../Button';
import axios from '../../api';

import './styles.scss';

const qs = require('qs');

const LinkForm = ({
  onChangeLink, openLinkForm, closeLinkForm, linkFormOpened, link, categories, getCategories,
}) => {
  const [categoryId, setCategoryId] = useState(null);
  const [lists, setLists] = useState([]);
  const [listId, setListId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [categoryInputOpen, setCategoryInputOpen] = useState(false);
  const [listInputOpen, setListInputOpen] = useState(false);

  const url = link;

  const validURL = (str) => {
    const pattern = new RegExp('^(https?:\\/\\/)?' // protocol
      + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
      + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
      + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
      + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
      + '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
  };

  const handleSubmitLink = (evt) => {
    evt.preventDefault();
    if (validURL(url)) {
      openLinkForm();
      setErrorMessage('');
    }
    else {
      setErrorMessage('please use a valid link');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      closeLinkForm();
    }
  };

  const handleOnChangeLink = (value) => {
    onChangeLink(value);
    if (linkFormOpened) {
      closeLinkForm();
    }
  };

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
          setConfirmationMessage('link has been created!');
          setTimeout(() => {
            setConfirmationMessage('');
          }, 5000);
        }
      })
      .catch(() => {
        setErrorMessage('There is a problem with your link');
      });
  };

  const getListsFromSelectedCategory = () => {
    axios.get(`categories/${categoryId}/lists`)
      .then((result) => {
        if (result && result.data) {
          setLists(result.data);
        }
      })
      .catch(() => {
        setLists([]);
      });
  };

  const categorySelected = (evt) => {
    setCategoryId(evt.target.value);
    setListId(null);
  };

  const listSelected = (evt) => {
    setListId(evt.target.value);
  };

  useEffect(() => {
    setErrorMessage('');
    getCategories();
    if (categoryId) {
      getListsFromSelectedCategory();
    }
  }, [
    categoryId,
    categoryInputOpen,
    listId,
    listInputOpen,
  ]);

  const openCategoryInput = () => {
    setCategoryInputOpen(true);
    setCategoryId(null);
    setConfirmationMessage('');
  };

  const openListInput = () => {
    setListInputOpen(true);
    setListId(null);
    setConfirmationMessage('');
  };

  return (
    <div className="linkForm">
      <form action="" className="form-form" onSubmit={handleSubmitLink}>
        <Input
          label=""
          className="linkInput"
          onChange={handleOnChangeLink}
          value={link}
          name="link"
          type="search"
        />
        {!linkFormOpened && confirmationMessage && (
          <p className="confirmationMessage linkForm__message">{confirmationMessage}</p>
        )}
        {errorMessage && !linkFormOpened && (
        <p className="errorMessage">{errorMessage}</p>
        )}
      </form>
      {linkFormOpened && (
        <form onSubmit={handleSubmitForm} className="linkForm-part2">
          {errorMessage && (
            <p className="errorMessage">{errorMessage}</p>
          )}
          {confirmationMessage && (
            <p className="confirmationMessage confirmationMessage-closed">{confirmationMessage}</p>
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
                >+ or create a category +
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
                  >+ or create a list +
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
                <Button type="submit" classname="linkForm__button linkForm-part2-button" text="create" />
              </div>
            )}
          <Button classname="linkForm__button" onClick={closeAndResetForm} text="cancel" />
        </form>
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
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
  getCategories: PropTypes.func.isRequired,
};

LinkForm.defaultProps = {
  link: '',
};

export default LinkForm;
