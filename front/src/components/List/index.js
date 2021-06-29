import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';
import axios from '../../api';
import './styles.scss';
import LinkBox from '../LinkBox';
import Input from '../Input';
import link from '../../selectors/link';

const qs = require('qs');

const List = ({
  list, listIndex, getLists, lists,
}) => {
  const [url, setUrl] = useState('');
  const [inputLoading, setInputLoading] = useState(false);
  const [links, setLinks] = useState(list.links);
  const [errorMessage, setErrorMessage] = useState('');
  const [listNameErrorMessage, setListNameErrorMessage] = useState('');
  const [noLinksMessage, setNoLinksMessage] = useState('');
  const [inputOpen, setInputOpen] = useState(false);
  const [linkDeleted, setLinkDeleted] = useState(false);
  const [headerInputOpened, setHeaderInputOpened] = useState(false);
  const [listName, setListName] = useState(list.name);

  const [validURL] = link();

  const openInput = () => {
    setInputOpen(!inputOpen);
    setHeaderInputOpened(false);
  };

  const onChangeUrl = (value) => {
    setUrl(value);
  };

  const openHeaderInput = () => {
    setHeaderInputOpened(!headerInputOpened);
    setInputOpen(false);
  };

  const onChangeListName = (value) => {
    setListName(value);
  };

  const handleSubmitNewListName = (evt) => {
    evt.preventDefault();
    if (listName.length > 0) {
      axios.patch(`lists/${list.id}`,
        qs.stringify({ name: listName, category_id: list.category_id }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } })
        .then((result) => {
          if (result) {
            setListNameErrorMessage('');
            setHeaderInputOpened(false);
          }
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
    else {
      setListNameErrorMessage('must be at least 1 character');
    }
  };

  const handleSubmitLink = (evt) => {
    evt.preventDefault();
    setInputLoading(true);
    setTimeout(() => {
      if (validURL(url)) {
        setErrorMessage('');
        setTimeout(() => {
          axios.post('links',
            qs.stringify({ url, list_id: list.id }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } })
            .then((result) => {
              if (result) {
                setInputOpen(false);
                setUrl('');
                getLists();
                setLinks(list.links);
              }
            })
            .catch(() => {
              setErrorMessage('There is a problem with your link');
            });
        }, 1000);
      }
      else {
        setErrorMessage('please use a valid link');
      }
    }, 3500);
    setTimeout(() => {
      setInputLoading(false);
    }, 5000);
  };

  useEffect(() => {
    let isMounted = true;
    // console.log('lists', lists);
    if (isMounted) {
      if (list.links[0]) {
        setLinks(list.links);
        setNoLinksMessage('');
      }
      else {
        setLinks([]);
        setNoLinksMessage('there are no links yet, add one first!');
      }
    }
    return () => {
      isMounted = false;
    };
  }, [list, url, linkDeleted, errorMessage]);

  function handleOnDragEndLinks(result) {
    const { source, destination } = result;
    console.log('source', source);
    console.log('destination', destination);
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId
      && destination.index === source.index
    ) {
      return;
    }
    const sInd = source.droppableId;
    const dInd = destination.droppableId;
    console.log('result', result);
    console.log('sInd', sInd);
    console.log('dInd', dInd);
    if (sInd === dInd) {
      const items = Array.from(links);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      items.map((item, index) => (
        axios.patch(`links/${item.id}`, qs.stringify({ position: index }),
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } })
          .then((result) => {
            // console.log('result', result);
            getLists();
          })
          .catch((error) => {
            setErrorMessage(error.response.data.error);
          })
      ));
      setLinks(items);
    }
    // else {
    const start = lists[source.droppableId];
    console.log('start', start);
    const finish = lists[destination.droppableId];
    console.log('finish', finish);
    // console.log('result', result);
    const startLinks = Array.from(start.links);
    startLinks.splice(source.index, 1);
    const newStart = {
      ...start,
      links: startLinks,
    };

    const finishLinks = Array.from(finish.links);
    finishLinks.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      links: finishLinks,
    };

    const newState = {
      ...list,
      links: {
        ...links,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setLinks(newState);
    // }
  }

  return (
    <Draggable draggableId={list.id.toString()} index={listIndex}>
      {(provided) => (
        <div
          className="list"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div
            className="list-header__div"
            {...provided.dragHandleProps}
          >
            {!headerInputOpened ? (
              <h3 className="list-header" onClick={openHeaderInput}>{listName}</h3>
            ) : (
              <div className="list__name-input--div">
                <form action="" onSubmit={handleSubmitNewListName}>
                  <Input
                    label=""
                    className="list__name-input"
                    onChange={onChangeListName}
                    value={listName}
                    name="list"
                    autocomplete="off"
                  />
                </form>
                <div className="list__name-input--close" onClick={openHeaderInput}>X</div>
              </div>
            )}
            <button type="button" className={classNames('list-header__input-opener', { 'list-header__input-opener--open': inputOpen })} onClick={openInput}>+</button>
          </div>
          {inputOpen && !headerInputOpened && (

            <form action="" className="form-form list__input--open" onSubmit={handleSubmitLink}>
              <Input
                label=""
                className={classNames('linkInput list__link-input', { 'list__link-input--loading': inputLoading, 'list__link-input--no-links': !links.length })}
                onChange={onChangeUrl}
                value={url}
                name="link"
              />
              {errorMessage && (
              <p className="errorMessage linkForm__message">{errorMessage}</p>
              )}
            </form>

          )}
          <DragDropContext onDragEnd={handleOnDragEndLinks}>
            <Droppable droppableId={list.position.toString()} direction="vertical">
              {(prov) => (
                <div className="list--scroll" ref={prov.innerRef} {...prov.droppableProps}>
                  {listNameErrorMessage && (
                  <p className="errorMessage linkForm__message list__name-input--error">{listNameErrorMessage}</p>
                  )}
                  {!inputOpen && noLinksMessage && (
                  <p className="list-noLinkMessage">{noLinksMessage}</p>
                  )}
                  {links && links.map((link, index) => (
                    <LinkBox
                      key={link.id}
                      link={link}
                      setLinkDeleted={setLinkDeleted}
                      index={index}
                      getLists={getLists}
                    />
                  ))}
                  {prov.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}
    </Draggable>
  );
};
export default List;
