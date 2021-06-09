import React, { useEffect, useState } from 'react';

import axios from '../../api';

const ListsContainer = ({ category }) => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    axios.get(`categories/${category.id}/lists`)
      .then((result) => {
        if (result && result.data) {
          setLists(result.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(lists);
  return (
    <div className="listsContainer">
      {category.name}
    </div>
  );
};

export default ListsContainer;
