import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'src/api';

import './styles.scss';

const qs = require('qs');

const LoginForm = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const onChangeEmail = (evt) => {
    setEmail(evt.target.value);
  };
  const onChangePassword = (evt) => {
    setPassword(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios.post('connexion', qs.stringify({ email, password }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } })
      .then((result) => {
        if (result) {
          // setEmail('');
          setPassword('');
          handleLogin();
        }
      })
      .catch((error) => {
        (console.log('error', error.response.data.error));
        setErrorMessage(error.response.data.error);
      });
  };

  return (
    <div className="loginForm">
      {errorMessage && (
        <p className="errorMessage">{errorMessage}</p>
      )}
      <form action="" className="loginForm-form" onSubmit={handleSubmit}>
        <label htmlFor="email-input" className="loginForm-label">
          e-mail
          <input
            type="email"
            value={email}
            name="email"
            className="loginForm-input"
            placeholder="e-mail"
            onChange={onChangeEmail}
          />
        </label>
        <label htmlFor="password-input" className="loginForm-label">
          password
          <input
            type="password"
            value={password}
            name="password"
            className="loginForm-input"
            placeholder="password"
            onChange={onChangePassword}
          />
        </label>
        <button type="submit">
          Sign in
        </button>
      </form>
      <Link to="/signup" className="loginForm-link link">Sign up</Link>
    </div>
  );
};

export default LoginForm;
