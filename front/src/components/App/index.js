// == Import npm
import React, { useEffect, useState } from 'react';
import {
  Route,
  Switch,
  Redirect,
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
import Loading from '../Loading';

// == Composant
const App = ({
  isLogged, setIsLogged, closeLinkForm, getCategories,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
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
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [isLogged]);

  if (loading) {
    return <Loading />;
  }
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
            <Route path="/error" exact>
              <Error />
            </Route>
            <Redirect to="/error" />
          </>
        ) : (
          <>
            <Route path={['/', '/categories']} exact>
              <Categories />
            </Route>
            <Route path="/category/:categoryId">
              <CategoryPage loading={loading} />
            </Route>
            <Route path="/error" exact>
              <Error />
            </Route>
            <Redirect to="/error" />
          </>
        )}
        <Redirect to="/error" />
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
