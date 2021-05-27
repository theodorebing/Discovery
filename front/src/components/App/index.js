// == Import npm
import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

// == Import
import './styles.scss';
import Index from '../Index';

// == Composant
const App = ({ isLogged }) => (
  <div className="app">
    <Switch>
      {!isLogged && (
        <>
          <Route path="/">
            <Index />
          </Route>
        </>
      )}
      {/* {isLogged && (
          <>
            <Route path="/" exact>
              <Categories />
            </Route>
            <Route path="/recipe/:recipeSlug">
              <Recipe />
            </Route>
          </>
        )} */}
      <Route>
        <Error />
      </Route>
    </Switch>
  </div>
);

// == Export
export default App;
