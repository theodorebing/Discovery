import React, { useEffect, useState } from 'react';
import List from '../../containers/List';

import axios from '../../api';

import './styles.scss';

const ListsContainer = ({
  link, lists, placeholder, listErrorMessage, getLists,
}) => {
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getLists();
    }
    return () => {
      isMounted = false;
    };
  }, [link]);

  return (
    <div className="listsContainer">
      {listErrorMessage && (
        <p className="listsContainer-noListMessage">{listErrorMessage}</p>
      )}
      {lists && lists.map((list, index) => (
        <List key={list.id} list={list} listIndex={index} getLists={getLists} lists={lists} />
      ))}
      {placeholder}
    </div>
  );
};

export default ListsContainer;
