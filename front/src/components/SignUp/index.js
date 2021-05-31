import React from 'react';
import Page from 'src/components/Page';

const SignUp = () => (
  <Page>
    <div className="loginForm">
      <form
        action=""
        className="loginForm-form"
      >
        <label htmlFor="email-input" className="loginForm-label">
          e-mail signup
          <input
            type="email"
          // value={email}
            name="email"
            className="loginForm-input"
            placeholder="e-mail"
          />
        </label>
        <label htmlFor="email-input" className="loginForm-label">
          e-mail signup
          <input
            type="email"
          // value={email}
            name="email"
            className="loginForm-input"
            placeholder="e-mail"
          />
        </label>
        <label htmlFor="email-input" className="loginForm-label">
          e-mail signup
          <input
            type="email"
          // value={email}
            name="email"
            className="loginForm-input"
            placeholder="e-mail"
          />
        </label>
        <label htmlFor="password-input" className="loginForm-label">
          password
          <input
            type="password"
          // value={password}
            name="password"
            className="loginForm-input"
            placeholder="password"
          />
        </label>
        <button type="submit">
          Sign in
        </button>
      </form>
    </div>
  </Page>
);

export default SignUp;
