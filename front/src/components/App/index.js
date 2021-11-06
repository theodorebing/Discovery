// == Import npm
import React, { useEffect, useState } from 'react';
import {
  Route,
  Switch,
  useHistory,
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
import Profile from '../Profile';

// == Composant
const App = ({
  isLogged, setIsLogged, closeLinkForm, getCategories,
}) => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  useEffect(() => {
    setLoading(true);
    if (!isLogged) {
      axios.get('account')
        .then(() => {
          closeLinkForm();
          setIsLogged();
        })
        .catch(() => {
          closeLinkForm();
          history.push('/');
        });
    }
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (isLogged) {
    getCategories();
  }

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="app">
      {!isLogged ? (
        <Switch>
          <Route path="/" exact>
            <Index />
          </Route>
          <Route path="/signup" exact>
            <SignUp />
          </Route>
          <Route path={['/error', '*']} exact>
            <Error />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route path={['/', '/categories']} exact>
            <Categories />
          </Route>
          <Route path="/category/:categoryId" exact>
            <CategoryPage />
          </Route>
          <Route path="/profile" exact>
            <Profile />
          </Route>
          <Route path={['/error', '*']} exact>
            <Error />
          </Route>
        </Switch>
      )}
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
