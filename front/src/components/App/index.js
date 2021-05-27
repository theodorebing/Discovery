// == Import npm
import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

// == Import
import './styles.scss';
import Index from '../Index';
import Categories from '../Categories';

// == Composant
const App = ({ isLogged }) => {
  console.log('isLogged', isLogged);

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
