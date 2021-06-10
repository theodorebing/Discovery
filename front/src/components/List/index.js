import React, { useEffect, useState } from 'react';
import LinkBox from '../LinkBox';
import axios from '../../api';
import './styles.scss';

const List = ({ list, link }) => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    axios.get(`lists/${list.id}/links`)
      .then((result) => {
        if (result && result.data) {
          setLinks(result.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [link]);

  return (
    <div className="list">
      <h3 className="list-header">{list.name}</h3>
      {/* <div className="list--scroll"> */}
      {links && links.map((link) => (
        <LinkBox key={link.id} link={link} />
      ))}
      {/* </div> */}
    </div>
  );
};
export default List;
