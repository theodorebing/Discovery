import React, { useState, useEffect } from 'react';
import Page from '../Page';
import './styles.scss';
import Logout from '../../containers/Logout';
import LinkForm from '../../containers/LinkForm';
import CategoriesList from '../CategoriesList';
import CreateNewCategoryInput from '../CreateNewCategoryInput';
import Loading from '../Loading';
import Select from '../Select';

import axios from '../../api';

const Categories = ({ categories, getCategories }) => {
  const [categoryInputOpen, setCategoryInputOpen] = useState(false);
  const [categorySelectOpen, setCategorySelectOpen] = useState(false);
  const [categorytToDeleteId, setCategorytToDeleteId] = useState(null);
  const [categorytToDeleteName, setCategorytToDeleteName] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const openCategoryInput = () => {
    setCategoryInputOpen(true);
  };

  const openCategorySelect = () => {
    setCategorySelectOpen(true);
  };

  const categorySelected = (evt) => {
    const name = evt.target.options[evt.target.selectedIndex].text;
    setCategorytToDeleteName(name.toUpperCase());
    setCategorytToDeleteId(evt.target.value);
  };

  const confirmationMessageFunction = (value) => {
    setConfirmationMessage(value);
    setTimeout(() => {
      setShowConfirmationMessage(true);
    }, 1000);
    setTimeout(() => {
      setShowConfirmationMessage(false);
    }, 4000);
  };

  const confirmCategoryDeletion = () => {
    axios.delete(`categories/${categorytToDeleteId}`)
      .then((result) => {
        if (result && result.data) {
          setLoading(true);
          getCategories();
          setCategorytToDeleteId(null);
          confirmationMessageFunction(`category ${categorytToDeleteName} deleted`);
          setCategorySelectOpen(false);
          setTimeout(() => {
            setLoading(false);
            setCategorytToDeleteName('');
          }, 1000);
        }
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error);
      });
  };

  const cancelDeleteCategory = () => {
    setCategorytToDeleteId(null);
    setCategorySelectOpen(false);
  };

  useEffect(() => {
    setLoading(true);
    getCategories();
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [confirmationMessage]);

  return (
    <Page>
      <div className="categories">
        <LinkForm />

        {loading && (
          <Loading />
        )}
        {!loading && !categoryInputOpen && !categorySelectOpen && (
          <>
            <div className="categories-div">
              <button type="button" className="categories-div__action" onClick={openCategoryInput}>+ create a new category +</button>
              <button type="button" className="categories-div__action" onClick={openCategorySelect}>- delete a category -</button>
            </div>
            {showConfirmationMessage ? (
              <p className="confirmationMessage confirmationMessage__category-page">{confirmationMessage}</p>
            ) : (<p className="categories__text">choose a category below</p>)}
            <CategoriesList categories={categories} />
          </>
        )}
        {!loading && categoryInputOpen && (
          <div className="categories-div__action-input">
            <CreateNewCategoryInput
              setCategoryInputOpen={setCategoryInputOpen}
              setConfirmationMessage={confirmationMessageFunction}
            />
          </div>
        )}
        {!loading && categorySelectOpen && (
          <div className="categories-div__action-input">
            {errorMessage && (
              <p className="errorMessage">{errorMessage}</p>
            )}
            <Select
              values={categories}
              name="category"
              label="choose a category to delete"
              valueSelected={categorySelected}
            />
            {categorytToDeleteId && (
            <>
              <p className="errorMessage">if you confirm deletion it will delete the category and all it's lists and links</p>
              <button type="button" className="categories-div__action" onClick={confirmCategoryDeletion}>confirm deletion</button>
            </>
            )}
            <p onClick={cancelDeleteCategory} className="newInput-close">cancel</p>
          </div>
        )}

        <Logout />
      </div>
    </Page>
  );
};
export default Categories;
