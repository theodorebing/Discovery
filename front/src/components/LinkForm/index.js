import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import Select from '../Select';
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
  const handleSubmitLink = (evt) => {
    evt.preventDefault();
    openLinkForm();
  };

  const url = link;

  const handleSubmitForm = (evt) => {
    evt.preventDefault();
    axios.post('links',
      qs.stringify({ url, list_id: listId }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } })
      .then((result) => {
        if (result) {
          closeLinkForm();
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
          <form method="post" className="linkForm-part2-form" onSubmit={handleSubmitForm}>
            <div className="linkForm-part2-div">
              <Select
                values={categories}
                name="category"
                label="choose a category"
                valueSelected={categorySelected}
              />
              <p
                className="linkForm-part2-create"
                onClick={() => {
                  console.log('test');
                }}
              >or create a category +
              </p>
            </div>
            {categoryId && (
            <div className="linkForm-part2-div">
              <Select
                values={lists}
                name="list"
                label="choose a list"
                valueSelected={listSelected}
              />
              <p
                className="linkForm-part2-create"
                onClick={() => {
                  console.log('test');
                }}
              >or create a list +
              </p>
            </div>
            )}
            {listId && (
            <div className="linkForm-part2-div">
              <button type="button" onClick={handleSubmitForm}>
                create the link
              </button>
            </div>
            )}
          </form>
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
