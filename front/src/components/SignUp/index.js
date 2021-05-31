import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api';
import Page from '../Page';
import Input from '../Input';

const qs = require('qs');

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const onChangeName = (value) => {
    setName(value);
  };
  const onChangeEmail = (value) => {
    setEmail(value);
  };
  const onChangePassword = (value) => {
    setPassword(value);
  };

  const handleSubmitSubscription = (evt) => {
    evt.preventDefault();
    axios.post('subscription', qs.stringify({ name, email, password }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } })
      .then((result) => {
        if (result) {
          console.log('subscription worked fine', result);
          setPassword('');
          setErrorMessage(null);
          setConfirmationMessage('You are now subscribed! Please go back to sign in page and connect');
        }
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error);
      });
  };
  return (
    <Page>
      <div className="form">
        {errorMessage && (
          <p className="errorMessage">{errorMessage}</p>
        )}
        {!confirmationMessage ? (
          <>
            <form action="" className="form-form" onSubmit={handleSubmitSubscription}>
              <Input
                onChange={onChangeName}
                value={name}
                name="name"
              />
              <Input
                onChange={onChangeEmail}
                value={email}
                name="email"
              />
              <Input
                onChange={onChangePassword}
                value={password}
                name="password"
              />
              <button type="submit">
                Sign up!
              </button>
            </form>
            <Link to="/" className="form-link link">Return</Link>
          </>
        ) : (
          <>
            <p className="confirmationMessage">{confirmationMessage}</p>
            <Link to="/" className="form-link link">Go to sign in page!</Link>
          </>
        )}
      </div>
    </Page>
  );
};
export default SignUp;
