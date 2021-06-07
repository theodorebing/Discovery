// == Import npm
import React, { useEffect } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';

// == Import
import './styles.scss';
import axios from '../../api';
import Index from '../Index';
import Categories from '../../containers/Categories';
import SignUp from '../SignUp';
import CategoryPage from '../../containers/CategoryPage';
import Error from '../Error';

// == Composant
const App = ({
  isLogged, setIsLogged, closeLinkForm, getCategories,
}) => {
  useEffect(() => {
    axios.get('account')
      .then(() => {
        closeLinkForm();
        setIsLogged();
      })
      .catch((error) => {
        console.log('error', error);
        closeLinkForm();
      });

    getCategories();
  }, [isLogged]);

  return (
    <div className="app">
      <Switch>
        {!isLogged ? (
          <>
            <Route path="/" exact>
              <Index />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
          </>
        ) : (
          <>
            <Route path={['/', '/categories']} exact>
              <Categories />
            </Route>
            <Route path="/:categoryId" exact>
              <CategoryPage />
            </Route>
            {/* <Route path="/recipe/:recipeSlug">
            <Recipe />
          </Route> */}
          </>
        )}
        <Route path="/error">
          <Error />
        </Route>
      </Switch>
    </div>
  );
};

App.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  setIsLogged: PropTypes.func.isRequired,
};

App.defaultProps = {

};

// == Export
export default App;
