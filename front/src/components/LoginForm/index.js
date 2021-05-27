import React, { useState } from 'react';
import axios from 'axios';

import './styles.scss';
import baseUrl from 'src/baseurl';

const qs = require('qs');

const LoginForm = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = (evt) => {
    setEmail(evt.target.value);
  };
  const onChangePassword = (evt) => {
    setPassword(evt.target.value);
  };

  const abortController = new AbortController();
  const { signal } = abortController;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios.post(`${baseUrl}connexion`, qs.stringify({ email, password }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } }, { signal })
      .then((result) => {
        if (result) {
          setEmail('');
          setPassword('');
          handleLogin();
        }
        return function cleanup() {
          abortController.abort();
        };
      })
      .catch((error) => {
        (console.log('error', error));
      });
  };

  return (
    <div className="loginForm">
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
      <a href="/signup" className="loginForm-link link">Sign up</a>
    </div>
  );
};

export default LoginForm;
