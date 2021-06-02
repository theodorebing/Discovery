// == Import npm
import React, { useEffect } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';

// == Import
import './styles.scss';
import axios from 'src/api';
import Index from '../Index';
import Categories from '../../containers/Categories';
import SignUp from '../SignUp';

// == Composant
const App = ({ isLogged, setIsLogged }) => {
  useEffect(() => {
    axios.get('account')
      .then(() => {
        setIsLogged();
      })
      .catch((error) => {
        console.log('error', error.response.data.error);
      });
  }, []);

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

App.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  setIsLogged: PropTypes.func.isRequired,
};

App.defaultProps = {

};

// == Export
export default App;
