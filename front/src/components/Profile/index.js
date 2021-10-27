import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from '../../api';

import './styles.scss';
import Page from '../../containers/Page';
import LinkForm from '../../containers/LinkForm';
import Input from '../Input';

import modifier from '../../assets/modifier.png';
import cross from '../../assets/cross.png';
import coche from '../../assets/coche.png';

const dayjs = require('dayjs');
const qs = require('qs');

const now = (value) => dayjs(value).format('D MMMM YYYY - H:mm');

const Profile = () => {
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [openNameInput, setOpenNameInput] = useState(false);
  const [openEmailInput, setOpenEmailInput] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    axios.get('account')
      .then((response) => {
        setUser(response.data);
        setName(response.data.name);
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  }, []);

  const openNameForm = () => {
    setOpenNameInput(true);
  };

  const closeNameForm = () => {
    setOpenNameInput(false);
    setName(user.name);
  };

  const onChangeName = (value) => {
    setName(value);
  };

  const confirmNameChange = (evt) => {
    evt.preventDefault();
    axios.patch('account', qs.stringify({ name }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } })
      .then((result) => {
        if (result) {
          setName(result.data.name);
          setOpenNameInput(false);
        }
      })
      .catch((err) => {
        if (err) {
          console.log('err', err);
        }
      });
  };

  const openEmailForm = () => {
    setOpenEmailInput(true);
  };

  const closeEmailForm = () => {
    setOpenEmailInput(false);
  };

  return (
    <Page>
      <div className="profile">
        <LinkForm />

        <h2 className="profile__header">PROFILE</h2>
        {!errorMessage && user && (
        <div className="form form__index">
          {/* <div className="profile__form-box"> */}
          <ul className="profile__form-box">
            <li className="profile__label">name</li>
            <span className="profile__line">
              {!openNameInput ? (
                <>
                  <h3 className="profile__name">{name}</h3>
                  <img src={modifier} alt="modifier" className="profile__img-modifier" onClick={openNameForm} />
                </>
              ) : (
                <form action="" className="profile__line" onSubmit={confirmNameChange}>
                  <div className="profile__input-margin">
                    <Input
                      label=""
                      onChange={onChangeName}
                      value={name}
                      name="name"
                    />
                  </div>
                  <div className="profile__line-sub">
                    <img src={cross} alt="cancel" className="profile__img-modifier" onClick={closeNameForm} />
                    <img src={coche} alt="coche" className="profile__img-modifier" onClick={confirmNameChange} />
                  </div>
                </form>
              )}
            </span>
            <li className="profile__label">email</li>
            <span className="profile__line">
              <h3 className="profile__name">{user.email}</h3>
              <img src={modifier} alt="modifier" className="profile__img-modifier" onClick={openEmailForm} />
            </span>
            <li className="profile__label">date user was created</li>
            <h3 className="profile__name">{now(user.created_at)}</h3>
            <li className="profile__label">last update</li>
            <h3 className="profile__name">{now(user.updated_at)}</h3>
          </ul>
          {/* </div> */}
        </div>
        )}
        {errorMessage && (
          <p className="profile__errorMessage">{errorMessage}</p>
        )}
      </div>
    </Page>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Profile;
