import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Page from '../../containers/Page';
import LinkForm from '../../containers/LinkForm';
import './styles.scss';
import Loading from '../Loading';
import ListsContainer from '../../containers/ListsContainer';
import Button from '../Button';
import CreateNewListInput from '../CreateNewListInput';
import Select from '../Select';
import Input from '../Input';

import axios from '../../api';

const qs = require('qs');

const CategoryPage = ({ category, getCategories, linkFormOpened }) => {
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
  const [changeCategoryNameInputOpened, setChangeCategoryNameInput] = useState(false);
  const [categoryNameErrorMessage, setCategoryNameErrorMessage] = useState('');
  const [categoryName, setCategoryName] = useState(category.name);

  const onChangeCategoryName = (value) => {
    setCategoryName(value);
  };

  const handleSubmitNewCategoryName = (evt) => {
    evt.preventDefault();
    if (categoryName.length > 0) {
      axios.patch(`categories/${category.id}`,
        qs.stringify({ name: categoryName.toUpperCase() }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } })
        .then((result) => {
          if (result) {
            setCategoryNameErrorMessage('');
            setChangeCategoryNameInput(false);
            getCategories();
          }
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
    else {
      setCategoryNameErrorMessage('must be at least 1 character');
    }
  };

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
    setShowConfirmationMessage(true);
    setTimeout(() => {
      setShowConfirmationMessage(false);
    }, 4000);
  };
  const listSelected = (evt) => {
    const name = evt.target.options[evt.target.selectedIndex].text;
    setListToDeleteName(name);
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

  const openChangeCategoryNameInput = () => {
    setCategoryName(category.name);
    setChangeCategoryNameInput(!changeCategoryNameInputOpened);
  };

  function handleOnDragEnd(result) {
    const items = Array.from(lists);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    items.map((item, index) => (
      axios.patch(`lists/${item.id}`, qs.stringify({ position: index, category_id: item.category_id }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } })
        .catch((error) => {
          setErrorMessage(error.response.data.error);
        })
    ));
    setLists(items);
  }

  return (
    <Page>
      <div className="category-page">
        <div className="category-page--fixed-components">
          <LinkForm />
        </div>

        {loading && (
          <Loading />
        )}
        {!loading && listInputOpen && !linkFormOpened && (
          <div className="categories-div__action-input category-page__action">
            <CreateNewListInput
              categoryId={category.id.toString()}
              setConfirmationMessage={confirmationMessageFunction}
              setListInputOpen={setListInputOpen}
            />
          </div>
        )}
        {!loading && listSelectOpen && !linkFormOpened && (
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
          {!listInputOpen && !listSelectOpen && !linkFormOpened && (
            <div className="category-page--fixed-components">
              <div className="categories-div">
                <Button classname="categories-div__action" onClick={openListInput} text="+ create a new list +" />
                <Button classname="categories-div__action" onClick={openListSelect} text="- delete a list -" />
              </div>
            </div>
          )}

          {showConfirmationMessage && (
            <p className="confirmationMessage confirmationMessage__category-page">{confirmationMessage}</p>
          )}
          {!showConfirmationMessage && !changeCategoryNameInputOpened && (
            <>
              <h2 className="category-page__name" onClick={openChangeCategoryNameInput}>{category.name}</h2>
            </>
          )}
          {changeCategoryNameInputOpened && (
            <div className="category-page__name-input--div">
              <form action="" onSubmit={handleSubmitNewCategoryName}>
                <Input
                  label=""
                  className="category-page__name-input"
                  onChange={onChangeCategoryName}
                  value={categoryName}
                  name="category"
                  autocomplete="off"
                />
              </form>
              <div className="category-page__name-input--close" onClick={openChangeCategoryNameInput}>X</div>
            </div>
          )}
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="list" direction="horizontal">
              {(provided) => (
                <div className="grid" ref={provided.innerRef} {...provided.droppableProps}>
                  <ListsContainer
                    category={category}
                    setLists={setLists}
                    lists={lists}
                    placeholder={provided.placeholder}
                  />
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </>
        )}
      </div>
    </Page>
  );
};

export default CategoryPage;
