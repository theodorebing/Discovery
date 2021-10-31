import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from '../../api';

import './styles.scss';
import Page from '../../containers/Page';
import LinkForm from '../../containers/LinkForm';
import Input from '../Input';
import Button from '../Button';

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
  const [email, setEmail] = useState('');
  const [openPasswordForm, setOpenPasswordForm] = useState(false);
  const [firstPreviousPassword, setFirstPreviousPassword] = useState('');
  const [secondPreviousPassword, setSecondPreviousPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [passwordConfirmationMessage, setPasswordConfirmationMessage] = useState('');

  console.log('passwordErrorMessage', passwordErrorMessage);

  const getAccount = () => {
    axios.get('account')
      .then((response) => {
        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  };

  useEffect(() => {
    getAccount();
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
    setEmail(user.email);
  };

  const onChangeEmail = (value) => {
    setEmail(value);
  };

  const confirmEmailChange = (evt) => {
    evt.preventDefault();
    if (email !== user.email) {
      axios.patch('account', qs.stringify({ email }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } })
        .then((result) => {
          if (result) {
            setEmail(result.data.email);
            setOpenEmailInput(false);
          }
        })
        .catch((err) => {
          if (err) {
            console.log('err', err.response);
          }
        });
    }
    else {
      setOpenEmailInput(false);
    }
    getAccount();
  };

  const passwordForm = () => {
    setOpenPasswordForm(!openPasswordForm);
    setFirstPreviousPassword('');
    setSecondPreviousPassword('');
    setNewPassword('');
  };

  const deletePasswordConfirmationMessage = () => {
    setTimeout(() => {
      setPasswordConfirmationMessage('');
    }, 5000);
  };

  const confirmPasswordChange = (evt) => {
    evt.preventDefault();
    console.log('confirmPasswordChange');

    if (firstPreviousPassword !== secondPreviousPassword) {
      setPasswordErrorMessage('previous passwords are not matching');
    }
    if (!firstPreviousPassword || !secondPreviousPassword || !newPassword) {
      setPasswordErrorMessage('please fill in all fields accordingly');
    }
    if ((firstPreviousPassword === secondPreviousPassword) && newPassword) {
      axios.post(
        'connexion',
        qs.stringify({ email, password: secondPreviousPassword }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } },
      )
        .then((result) => {
          if (result) {
            console.log('result', result);
            axios.patch('account', qs.stringify({ password: newPassword }),
              { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } })
              .then((res) => {
                if (res) {
                  passwordForm();
                  setPasswordConfirmationMessage('password has been modified');
                  deletePasswordConfirmationMessage();
                }
              })
              .catch((err) => {
                if (err) {
                  console.log('err', err.response);
                }
              });
          }
        })
        .catch((error) => {
          console.log('error', error);
          setPasswordErrorMessage('previous password is not correct');

          // setErrorMessage(error.response.data.error);
        });
    }
    // if (email !== user.email) {
    //   axios.patch('account', qs.stringify({ email }),
    //     { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } })
    //     .then((result) => {
    //       if (result) {
    //         setEmail(result.data.email);
    //         setOpenEmailInput(false);
    //       }
    //     })
    //     .catch((err) => {
    //       if (err) {
    //         console.log('err', err.response);
    //       }
    //     });
    // }
  };

  const onChangeFirstPassword = (value) => {
    setFirstPreviousPassword(value);
  };

  const onChangeSecondPassword = (value) => {
    setSecondPreviousPassword(value);
  };

  const onChangeNewPassword = (value) => {
    setNewPassword(value);
  };

  return (
    <Page>
      <div className="profile">
        <LinkForm />

        <h2 className="profile__header">PROFILE</h2>

        {!errorMessage && user && (
        <div className="form form__index profile__form">
          {passwordConfirmationMessage && (
          <p className="confirmationMessage profile__confirmationMessage">{passwordConfirmationMessage}</p>
          )}
          <ul className="profile__form-box">
            {!openPasswordForm ? (
              <>
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
                  {!openEmailInput ? (
                    <>
                      <h3 className="profile__name">{email}</h3>
                      <img src={modifier} alt="modifier" className="profile__img-modifier" onClick={openEmailForm} />
                    </>
                  ) : (
                    <form action="" className="profile__line" onSubmit={confirmEmailChange}>
                      <div className="profile__input-margin">
                        <Input
                          label=""
                          onChange={onChangeEmail}
                          value={email}
                          name="email"
                        />
                      </div>
                      <div className="profile__line-sub">
                        <img src={cross} alt="cancel" className="profile__img-modifier" onClick={closeEmailForm} />
                        <img src={coche} alt="coche" className="profile__img-modifier" onClick={confirmEmailChange} />
                      </div>
                    </form>
                  )}
                </span>

                <li className="profile__label">password</li>
                <Button classname="profile__button" text="Change password" onClick={passwordForm} />

                <li className="profile__label">date user was created</li>
                <h3 className="profile__name">{now(user.created_at)}</h3>
                <li className="profile__label">last update</li>
                <h3 className="profile__name">{now(user.updated_at)}</h3>
              </>
            ) : (
              <>
                {passwordErrorMessage && (
                <p className="errorMessage profile__passwordErrorMessage">{passwordErrorMessage}</p>
                )}
                <form action="" onSubmit={confirmPasswordChange}>
                  <li className="profile__label">type previous password</li>
                  <div className="profile__input-margin">
                    <Input
                      label=""
                      onChange={onChangeFirstPassword}
                      value={firstPreviousPassword}
                      name="previous password 1"
                      type="password"
                    />
                  </div>
                  <li className="profile__label">re-type previous password</li>
                  <div className="profile__input-margin">
                    <Input
                      label=""
                      onChange={onChangeSecondPassword}
                      value={secondPreviousPassword}
                      name="previous password 2"
                      type="password"
                    />
                  </div>
                  <li className="profile__label">new password</li>
                  <div className="profile__input-margin">
                    <Input
                      label=""
                      onChange={onChangeNewPassword}
                      value={newPassword}
                      name="new password"
                      type="password"
                    />
                  </div>
                  <button type="submit" className="button profile__button profile__button-password">validate new password</button>
                </form>
                <Button classname="profile__button profile__button-little" text="cancel" onClick={passwordForm} />
              </>
            )}
          </ul>
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
