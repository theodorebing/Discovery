import React, { useEffect, useState } from 'react';
import Page from 'src/components/Page';
import { useHistory } from 'react-router-dom';
import Logout from '../../containers/Logout';
import LinkForm from '../../containers/LinkForm';
import './styles.scss';
import Loading from '../Loading';
import ListsContainer from '../ListsContainer';

const CategoryPage = ({ category }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  console.log(category);
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    if (category === undefined) {
      history.push('/error');
    }
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Page>
      <div className="category-page">
        <LinkForm />
        {loading && (
          <Loading />
        )}
        {!loading && category && (
          <h2 className="category-page__name">{category.name}</h2>
        )}
        <ListsContainer category={category} />
        <Logout />
      </div>
    </Page>
  );
};

export default CategoryPage;
