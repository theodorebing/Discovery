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

const CategoryPage = ({
  category, getCategories, linkFormOpened,
}) => {
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
    const {
      source, destination, type, draggableId,
    } = result;

    console.log('lists', lists);

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId
      && destination.index === source.index
    ) {
      return;
    }

    // dnd for lists
    if (type === 'listsContainer') {
      const items = Array.from(lists);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      items.map((item, index) => (
        axios.patch(`lists/${item.id}`, qs.stringify({ position: index, category_id: item.category_id }),
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } })
          .catch((error) => {
            setErrorMessage(error.response.data.error);
          })
      ));
      setLists(items);
    }

    // dnd for links
    // if (type === 'list') {
    const home = lists[source.droppableId];
    const foreign = lists[destination.droppableId];
    console.log('home', home);
    console.log('foreign', foreign);
    if (home === foreign) {
      const newLinks = Array.from(home.links);
      console.log('newLinks 1', newLinks);
      const [reorderedNewLinks] = newLinks.splice(source.index, 1);
      newLinks.splice(destination.index, 0, reorderedNewLinks);

      console.log('newLinks 2', newLinks);

      const newHome = {
        ...home,
        links: newLinks,
      };

      let newLists = {
        ...lists,
        [newHome.position]: newHome,
      };

      newLists = Object.values(newLists);

      console.log('newHome', newHome);
      console.log('newHome.id', newHome.id);
      console.log('newLists', newLists);

      setLists(newLists);
      // }

      // const [reorderedItem] = items.splice(result.source.index, 1);
    //   items.splice(result.destination.index, 0, reorderedItem);
    //   items.map((item, index) => (
    //     axios.patch(`links/${item.id}`, qs.stringify({ position: index }),
    //       { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } })
    //       .then((result) => {
    //         // console.log('result', result);
    //         getLists();
    //       })
    //       .catch((error) => {
    //         setErrorMessage(error.response.data.error);
    //       })
    //   ));
    //   setLinks(items);
    // }
    }

    // moving from one list to another
    // const homeTaskIds = Array.from(home.taskIds);
    // homeTaskIds.splice(source.index, 1);
    // const newHome = {
    //   ...home,
    //   taskIds: homeTaskIds,
    // };

    // const foreignTaskIds = Array.from(foreign.taskIds);
    // foreignTaskIds.splice(destination.index, 0, draggableId);
    // const newForeign = {
    //   ...foreign,
    //   taskIds: foreignTaskIds,
    // };

    // const newState = {
    //   ...this.state,
    //   columns: {
    //     ...this.state.columns,
    //     [newHome.id]: newHome,
    //     [newForeign.id]: newForeign,
    //   },
    // };
    // this.setState(newState);

    // const sInd = source.droppableId;
    // const dInd = destination.droppableId;
    // // console.log('result', result);
    // // console.log('sInd', sInd);
    // // console.log('dInd', dInd);
    // if (sInd === dInd) {
    //   const items = Array.from(links);
    //   const [reorderedItem] = items.splice(result.source.index, 1);
    //   items.splice(result.destination.index, 0, reorderedItem);
    //   items.map((item, index) => (
    //     axios.patch(`links/${item.id}`, qs.stringify({ position: index }),
    //       { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } })
    //       .then((result) => {
    //         // console.log('result', result);
    //         getLists();
    //       })
    //       .catch((error) => {
    //         setErrorMessage(error.response.data.error);
    //       })
    //   ));
    //   setLinks(items);
    // }

    // if (source.droppableId.includes('list')) {
    //   // dnd for links
    //   // dropped outside the list
    //   if (!destination) {
    //     return;
    //   }
    //   // same place
    //   if (
    //     destination.droppableId === source.droppableId
    //     && destination.index === source.index
    //   ) {
    //     return;
    //   }
    //   const sInd = source.droppableId;
    //   const dInd = destination.droppableId;
    // move in the same list
    // if (sInd === dInd) {
    //   const items = Array.from(list.links);
    //   const [reorderedItem] = items.splice(result.source.index, 1);
    //   items.splice(result.destination.index, 0, reorderedItem);
    //   items.map((item, index) => (
    //     axios.patch(`links/${item.id}`, qs.stringify({ position: index }),
    //       { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } })
    //       .then((result) => {
    //         console.log('result', result);
    //       })
    //       .catch((error) => {
    //         setErrorMessage(error.response.data.error);
    //       })
    //   ));
    //   setLinks(items);
    //   // const items = Array.from(lists);
    //   // const [reorderedItem] = items.splice(result.source.index, 1);
    //   // items.splice(result.destination.index, 0, reorderedItem);
    //   // items.map((item, index) => (
    //   //   axios.patch(`links/${item.id}`, qs.stringify({ position: index }),
    //   //     { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } })
    //   //     .then((result) => {
    //   //       console.log('result', result);
    //   //     })
    //   //     .catch((error) => {
    //   //       setErrorMessage(error.response.data.error);
    //   //     })
    //   // ));
    //   // setLinks(items);
    // }
    // }
  }
  // function handleOnDragEnd(result) {

  //     else {
  //       const start = list[source.droppableId];
  //       const finish = list[destination.droppableId];
  //       console.log('result', result);
  //       const startLinksIds = Array.from(list.links.id);
  //       startLinksIds.splice(source.index, 1);
  //       const newStart = {
  //         ...start,
  //         taskIds: startTaskIds,
  //       };

  //       const finishTaskIds = Array.from(finish.taskIds);
  //       finishTaskIds.splice(destination.index, 0, draggableId);
  //       const newFinish = {
  //         ...finish,
  //         taskIds: finishTaskIds,
  //       };

  //       const newState = {
  //         ...this.state,
  //         columns: {
  //           ...this.state.columns,
  //           [newStart.id]: newStart,
  //           [newFinish.id]: newFinish,
  //         },
  //       };
  //       setLinks(items);
  //     }
  //   }

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
            <Droppable droppableId="container" direction="horizontal" type="listsContainer">
              {(provided) => (
                <div className="grid" ref={provided.innerRef} {...provided.droppableProps}>
                  <ListsContainer
                    category={category}
                    setLists={setLists}
                    lists={lists}
                    placeholder={provided.placeholder}
                    handleOnDragEnd={handleOnDragEnd}
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
