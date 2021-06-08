import React, { useState, useEffect } from 'react';
import Page from '../Page';
import './styles.scss';
import Logout from '../../containers/Logout';
import LinkForm from '../../containers/LinkForm';
import CategoriesList from '../CategoriesList';
import CreateNewCategoryInput from '../CreateNewCategoryInput';
import Loading from '../Loading';

// import axios from '../../api';

const Categories = ({ categories, getCategories }) => {
  const [categoryInputOpen, setCategoryInputOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const openCategoryInput = () => {
    setCategoryInputOpen(true);
  };

  const confirmationMessageFunction = (value) => {
    setConfirmationMessage(value);
    setTimeout(() => {
      setShowConfirmationMessage(true);
    }, 1000);
    setTimeout(() => {
      setShowConfirmationMessage(false);
    }, 3000);
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
        {!loading && !categoryInputOpen && (
          <>
            {showConfirmationMessage ? (
              <p className="confirmationMessage confirmationMessage__category-page">{confirmationMessage}</p>
            ) : (<p className="categories__text">choose a category below</p>)}
            <CategoriesList categories={categories} />
            <p className="categories__create" onClick={openCategoryInput}>create a new category +</p>
          </>
        )}
        {!loading && categoryInputOpen && (
          <div className="categories__create-input">
            <CreateNewCategoryInput
              setCategoryInputOpen={setCategoryInputOpen}
              setConfirmationMessage={confirmationMessageFunction}
            />
          </div>
        )}

        <Logout />
      </div>
    </Page>
  );
};
export default Categories;
