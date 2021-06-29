import React, { useEffect, useState } from 'react';
import List from '../../containers/List';

import axios from '../../api';

import './styles.scss';

const ListsContainer = ({
  category, link, setLists, lists, placeholder,
}) => {
  const [errorMessage, setErrorMessage] = useState('');

  const getLists = () => {
    axios.get(`categories/${category.id}/lists`)
      .then((result) => {
        if (result && result.data) {
          setLists(result.data);
        }
      })
      .catch((error) => {
        setLists([]);
        setErrorMessage('there are no lists yet, create one first!');
      });
  };

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
      {errorMessage && (
        <p className="listsContainer-noListMessage">{errorMessage}</p>
      )}
      {lists && lists.map((list, index) => (
        <List key={list.id} list={list} listIndex={index} getLists={getLists} lists={lists} />
      ))}
      {placeholder}
    </div>
  );
};

export default ListsContainer;
