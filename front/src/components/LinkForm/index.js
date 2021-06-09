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
        }
      })
      .catch(() => {
        setErrorMessage('There is a problem with your link');
      });
  };

  const getListsFromSelectedCategory = async () => {
    await (
      axios.get(`categories/${categoryId}/lists`)
        .then((result) => {
          if (result && result.data) {
            setLists(result.data);
            return result;
          }
        })
        .catch(() => {
          setLists([]);
        })
    );
  };

  const categorySelected = (evt) => {
    setCategoryId(evt.target.value);
    setListId(null);
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
      .catch(() => {
        setCategories([]);
      });
    if (categoryId) {
      getListsFromSelectedCategory();
    }
  }, [categoryId, categoryInputOpen, listId, listInputOpen]);

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
          label="paste your link here and click enter"
          className="linkInput"
          onChange={onChangeLink}
          value={link}
          name="link"
        />
        {errorMessage && !linkFormOpened && (
        <p className="errorMessage linkForm__message">{errorMessage}</p>
        )}
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
                <button type="button" onClick={handleSubmitForm}>
                  create the link
                </button>
              </div>
            )}
          <Button classname="linkForm__button" onClick={closeAndResetForm} text="cancel" />
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
