import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import axios from '../../api';
import './styles.scss';
import LinkBox from '../LinkBox';
import Input from '../Input';
import linkSelector from '../../selectors/link';

const ListContainer = styled.div`
  background-color: ${(props) => (props.isDragging ? '#222' : '#1a1a1a')};
`;

const qs = require('qs');

const List = ({
  list, listIndex, getLists,
}) => {
  const [url, setUrl] = useState('');
  const [inputLoading, setInputLoading] = useState(false);
  // const [links, setLinks] = useState(list.links);
  const { links } = list;
  const [errorMessage, setErrorMessage] = useState('');
  const [listNameErrorMessage, setListNameErrorMessage] = useState('');
  const [noLinksMessage, setNoLinksMessage] = useState('');
  const [inputOpen, setInputOpen] = useState(false);
  const [linkDeleted, setLinkDeleted] = useState(false);
  const [headerInputOpened, setHeaderInputOpened] = useState(false);
  const [listName, setListName] = useState(list.name);

  const [validURL] = linkSelector();

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
                // setLinks(list.links);
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
    if (isMounted) {
      if (list.links[0]) {
        // setLinks(list.links);
        setNoLinksMessage('');
      }
      else {
        // setLinks([]);
        setNoLinksMessage('there are no links yet, add one first!');
      }
    }
    return () => {
      isMounted = false;
    };
  }, [list, url, linkDeleted, errorMessage]);

  return (
    <Draggable draggableId={list.id.toString()} index={listIndex} type="list">
      {(provided, snapshot) => (
        <ListContainer
          className="list"
          ref={provided.innerRef}
          {...provided.draggableProps}
          isDragging={snapshot.isDragging}
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
                type="search"

              />
              {errorMessage && (
              <p className="errorMessage linkForm__message">{errorMessage}</p>
              )}
            </form>

          )}
          <Droppable
            droppableId={list.position.toString()}
            direction="vertical"
          >
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
                    key={`${link.title}+${link.id}`}
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
        </ListContainer>
      )}
    </Draggable>
  );
};
export default List;
