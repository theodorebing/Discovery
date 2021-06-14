import React, { useEffect, useState } from 'react';
import Page from 'src/components/Page';
import { useHistory } from 'react-router-dom';
import Logout from '../../containers/Logout';
import LinkForm from '../../containers/LinkForm';
import './styles.scss';
import Loading from '../Loading';
import ListsContainer from '../../containers/ListsContainer';
import Button from '../Button';
import CreateNewListInput from '../CreateNewListInput';
import Select from '../Select';
import CategoriesList from '../CategoriesList';

import axios from '../../api';

const CategoryPage = ({ category, categories }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [lists, setLists] = useState([]);
  const [listInputOpen, setListInputOpen] = useState(false);
  const [listSelectOpen, setListSelectOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
  const [listToDeleteId, setListToDeleteId] = useState(null);
  const [listToDeleteName, setListToDeleteName] = useState('');
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    if (category === undefined) {
      history.push('/error');
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [confirmationMessage]);

  const openListInput = () => {
    setListInputOpen(true);
  };

  const openListSelect = () => {
    setListSelectOpen(true);
  };

  const confirmationMessageFunction = (value) => {
    setConfirmationMessage(value);
    // setTimeout(() => {
    setShowConfirmationMessage(true);
    // }, 1000);
    setTimeout(() => {
      setShowConfirmationMessage(false);
    }, 4000);
  };
  const listSelected = (evt) => {
    const name = evt.target.options[evt.target.selectedIndex].text;
    setListToDeleteName(name.toUpperCase());
    setListToDeleteId(evt.target.value);
  };

  const confirmListDeletion = () => {
    axios.delete(`lists/${listToDeleteId}`)
      .then((result) => {
        if (result && result.data) {
          setLoading(true);
          setListToDeleteId(null);
          confirmationMessageFunction(`category ${listToDeleteName} deleted`);
          setListSelectOpen(false);
          setTimeout(() => {
            setLoading(false);
            setListToDeleteName('');
          }, 1000);
        }
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error);
      });
  };

  const cancelDeleteList = () => {
    setListToDeleteId(null);
    setListSelectOpen(false);
  };

  return (
    <Page>
      <div className="category-page">
        <div className="category-page--fixed-components">
          <LinkForm />
        </div>

        {loading && (
          <Loading />
        )}
        {!loading && listInputOpen && (
          <div className="categories-div__action-input category-page__action">
            <CreateNewListInput
              categoryId={category.id.toString()}
              setConfirmationMessage={confirmationMessageFunction}
              setListInputOpen={setListInputOpen}
            />
          </div>
        )}
        {!loading && listSelectOpen && (
        <div className="categories-div__action-input category-page__action">
          <form className="form-form newInput big-form">
            {errorMessage && (
            <p className="errorMessage">{errorMessage}</p>
            )}
            <Select
              values={lists}
              name="list"
              label="choose a list to delete"
              valueSelected={listSelected}
            />
            {listToDeleteId && (
            <>
              <p className="errorMessage errorMessage--delete-category">if you confirm deletion it will delete the list and it's links</p>
              <Button classname="categories-div__action categories-div__action--little" onClick={confirmListDeletion} text="confirm deletion" />
            </>
            )}
            <Button classname="linkForm__button newInput-close" onClick={cancelDeleteList} text="cancel" />
          </form>
        </div>
        )}
        {!loading && category && (
        <>
          {!listInputOpen && !listSelectOpen && (
            <div className="category-page--fixed-components">
              <div className="categories-div">
                <Button classname="categories-div__action" onClick={openListInput} text="+ create a new list +" />
                <Button classname="categories-div__action" onClick={openListSelect} text="- delete a list -" />
              </div>
            </div>
          )}

          {showConfirmationMessage ? (
            <p className="confirmationMessage confirmationMessage__category-page">{confirmationMessage}</p>
          ) : (
            <>
              <h2 className="category-page__name">{category.name}</h2>
              {/* <CategoriesList categories={categories} className="category"/> */}
            </>
          )}
          <div className="grid">
            <ListsContainer category={category} setLists={setLists} lists={lists} />
          </div>
        </>
        )}

        <Logout />
      </div>
    </Page>
  );
};

export default CategoryPage;
