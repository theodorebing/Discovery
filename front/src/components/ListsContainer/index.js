import React, { useEffect, useState } from 'react';
import List from '../../containers/List';

import axios from '../../api';

import './styles.scss';

const ListsContainer = ({ category, link }) => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    let isMounted = true;
    axios.get(`categories/${category.id}/lists`)
      .then((result) => {
        if (isMounted && result && result.data) {
          setLists(result.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      isMounted = false;
    };
  }, [link]);

  return (
    <div className="listsContainer--main-grid">
      <div className="listsContainer">
        {lists && lists.map((list) => (
          <List key={list.id} list={list} />
        ))}
      </div>

    </div>
  );
};

export default ListsContainer;
