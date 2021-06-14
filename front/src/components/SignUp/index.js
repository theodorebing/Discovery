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
        <div className="message-div">
          <p className="message-text formMessage">you must fill in each field to complete subscription</p>
        </div>
        {errorMessage && (
          <div className="message-div">
            <p className="message-text errorMessage">{errorMessage}</p>
          </div>
        )}
        {!confirmationMessage ? (
          <>
            <form action="" className="form-form signup-form" onSubmit={handleSubmitSubscription}>
              <Input
                label="name"
                onChange={onChangeName}
                value={name}
                name="name"
              />
              <Input
                label="email"
                onChange={onChangeEmail}
                value={email}
                name="email"
              />
              <Input
                label="password"
                onChange={onChangePassword}
                value={password}
                name="password"
              />
              <button type="submit" className="button">
                Sign up!
              </button>
            </form>
            <Link to="/" className="form-link link">Return</Link>
          </>
        ) : (
          <>
            <div className="message-div">
              <p className="message-text confirmationMessage">{confirmationMessage}</p>
            </div>

            <Link to="/" className="form-link link"><button type="button">Go to sign in page!</button></Link>
          </>
        )}
      </div>
    </Page>
  );
};
export default SignUp;
