import React, { useEffect, useState } from 'react';
import LinkBox from '../LinkBox';
import axios from '../../api';
import './styles.scss';

const List = ({ list }) => {
  const [links, setLinks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get(`lists/${list.id}/links`)
      .then((result) => {
        if (result && result.data) {
          setLinks(result.data);
          setErrorMessage('');
        }
      })
      .catch(() => {
        setErrorMessage('there are no links yet, add one first!');
      });
  }, [list]);

  return (
    <div className="list">
      <h3 className="list-header">{list.name}</h3>
      <div className="list--scroll">
        {errorMessage && (
        <p className="list-noLinkMessage">{errorMessage}</p>
        )}
        {links && links.map((link) => (
          <LinkBox key={link.id} link={link} />
        ))}
      </div>
    </div>
  );
};
export default List;
