import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import axios from '../../api';
import './styles.scss';
import LinkBox from '../LinkBox';
import Input from '../Input';
import link from '../../selectors/link';

const qs = require('qs');

const List = ({ list }) => {
  const [url, setUrl] = useState('');
  const [inputLoading, setInputLoading] = useState(false);
  const [links, setLinks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [inputOpen, setInputOpen] = useState(false);
  const [validURL] = link();

  const openInput = () => {
    setInputOpen(!inputOpen);
  };

  const onChangeUrl = (value) => {
    setUrl(value);
  };

  const handleSubmitLink = (evt) => {
    evt.preventDefault();
    setInputLoading(true);
    setTimeout(() => {
      if (validURL(url)) {
        setErrorMessage('');
        axios.post('links',
          qs.stringify({ url, list_id: list.id }),
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } })
          .then((result) => {
            if (result) {
              setInputOpen(false);
              setUrl('');
            }
          })
          .catch(() => {
            setErrorMessage('There is a problem with your link');
          });
      }
      else {
        setErrorMessage('please use a valid link');
      }
    }, 3000);
    setTimeout(() => {
      setInputLoading(false);
    }, 5000);
  };

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
  }, [list, url]);

  return (
    <div className="list">
      <div className="list-header__div">
        <h3 className="list-header">{list.name}</h3>
        <button type="button" className={classNames('list-header__input-opener', { 'list-header__input-opener--open': inputOpen })} onClick={openInput}>+</button>
      </div>
      {inputOpen && (
        <form action="" className="form-form list__input--open" onSubmit={handleSubmitLink}>
          <Input
            label=""
            className={classNames('linkInput list__link-input', { 'list__link-input--loading': inputLoading })}
            onChange={onChangeUrl}
            value={url}
            name="link"
          />
          {errorMessage && (
          <p className="errorMessage linkForm__message">{errorMessage}</p>
          )}
        </form>
      )}
      <div className="list--scroll">
        {!inputOpen && errorMessage && (
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
