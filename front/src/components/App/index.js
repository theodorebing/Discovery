// == Import npm
import React, { useState, useEffect } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

// == Import
import './styles.scss';
import axios from 'src/api';
import Index from '../Index';
import Categories from '../Categories';

// == Composant
const App = ({ isLogged, setIsLogged }) => {
  useEffect(() => {
    axios.get('account', { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } })
      .then((result) => {
        console.log('result', result);
        console.log('isLogged', isLogged);
        setIsLogged();
      })
      .catch((error) => {
        console.log('error', error.response.data.error);
      });
  });
  // console.log('isLogged', isLogged);

  return (
    <div className="app">
      <Switch>
        {!isLogged ? (
          <>
            <Route path="/">
              <Index />
            </Route>
          </>
        ) : (
          <>
            <Route path="/" exact>
              <Categories />
            </Route>
            {/* <Route path="/recipe/:recipeSlug">
            <Recipe />
          </Route> */}
          </>
        )}
        <Route>
          <Error />
        </Route>
      </Switch>
    </div>
  );
};

// == Export
export default App;
