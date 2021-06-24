import React, { useEffect, useState } from 'react';
import List from '../../containers/List';

import axios from '../../api';

import './styles.scss';

const ListsContainer = ({
  category, link, setLists, lists, placeholder,
}) => {
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;
    axios.get(`categories/${category.id}/lists`)
      .then((result) => {
        if (isMounted && result && result.data) {
          setLists(result.data);
        }
      })
      .catch((error) => {
        if (isMounted) {
          setLists([]);
          setErrorMessage('there are no lists yet, create one first!');
        }
      });
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
        <List key={list.id} list={list} index={index} />
      ))}
      {placeholder}
    </div>
  );
};

export default ListsContainer;
