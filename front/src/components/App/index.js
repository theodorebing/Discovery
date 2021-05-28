// == Import npm
import React, { useState, useEffect } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

// == Import
import './styles.scss';
import axios from 'axios';
import Index from '../Index';
import Categories from '../Categories';
import baseUrl from '../../baseurl';

// == Composant
const App = ({ isLogged, id }) => {
  useEffect(() => {
    axios.get(`${baseUrl}account`)
      .then((result) => {
        console.log('result', result);
      });
  });
  console.log('id', id);

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
