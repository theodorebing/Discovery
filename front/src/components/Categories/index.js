import React, { useState, useEffect } from 'react';
import Page from '../../containers/Page';
import './styles.scss';
import Logout from '../../containers/Logout';
import LinkForm from '../../containers/LinkForm';
import CategoriesList from '../CategoriesList';
import CreateNewCategoryInput from '../CreateNewCategoryInput';
import Loading from '../Loading';
import Select from '../Select';
import Button from '../Button';

import axios from '../../api';

const Categories = ({ categories, getCategories, linkFormOpened }) => {
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
    // getCategories();
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
        {!loading && categoryInputOpen && !linkFormOpened && (
          <div className="categories-div__action-input">
            <CreateNewCategoryInput
              setCategoryInputOpen={setCategoryInputOpen}
              setConfirmationMessage={confirmationMessageFunction}
            />
          </div>
        )}
        {!loading && categorySelectOpen && !linkFormOpened && (
          <div className="categories-div__action-input">
            <form className="form-form newInput big-form">
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
                <p className="errorMessage errorMessage--delete-category">if you confirm deletion it will delete the category <br /> and all it's lists and links</p>
                <Button classname="categories-div__action categories-div__action--little" onClick={confirmCategoryDeletion} text="confirm deletion" />
              </>
              )}
              {/* <p onClick={cancelDeleteCategory} className="newInput-close">cancel</p> */}
              <Button classname="linkForm__button newInput-close" onClick={cancelDeleteCategory} text="cancel" />
            </form>
          </div>
        )}
        {!loading && (
          <>
            {!categoryInputOpen && !categorySelectOpen && !linkFormOpened && (
              <div className="categories-div">
                <Button classname="categories-div__action" onClick={openCategoryInput} text="+ create a new category +" />
                <Button classname="categories-div__action" onClick={openCategorySelect} text="- delete a category -" />
              </div>
            )}
            {showConfirmationMessage ? (
              <p className="confirmationMessage confirmationMessage__categories-page">{confirmationMessage}</p>
            ) : (<p className="categories__text">choose a category below</p>)}
            <CategoriesList categories={categories} />
          </>
        )}

        {/* <Logout /> */}
      </div>
    </Page>
  );
};
export default Categories;
