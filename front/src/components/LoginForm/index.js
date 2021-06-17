import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'src/api';

import Input from '../Input';

const qs = require('qs');

const LoginForm = ({ handleLogin, closeLinkForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const onChangeEmail = (value) => {
    setEmail(value);
  };
  const onChangePassword = (value) => {
    setPassword(value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios.post(
      'connexion',
      qs.stringify({ email, password }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } },
    )
      .then((result) => {
        if (result) {
          closeLinkForm();
          setPassword('');
          handleLogin();
        }
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error);
      });
  };

  return (
    <div className="form form__index">
      <div className="message-div">
        <p className="message-text formMessage">please enter your connection informations to be linked</p>
      </div>
      {errorMessage && (
        <div className="message-div">
          <p className="message-text errorMessage">{errorMessage}</p>
        </div>
      )}
      <form action="" className="form-form login-form" onSubmit={handleSubmit}>
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
          Sign in
        </button>
      </form>
      <Link to="/signup" className="form-link link">Sign up</Link>
    </div>
  );
};

export default LoginForm;
