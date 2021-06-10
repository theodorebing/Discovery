import React, { useEffect, useState } from 'react';
import Page from 'src/components/Page';
import { useHistory } from 'react-router-dom';
import Logout from '../../containers/Logout';
import LinkForm from '../../containers/LinkForm';
import './styles.scss';
import Loading from '../Loading';
import ListsContainer from '../../containers/ListsContainer';
import Button from '../Button';

const CategoryPage = ({ category }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

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
  const [listInputOpen, setListInputOpen] = useState(false);
  const [listSelectOpen, setListSelectOpen] = useState(false);
  const openListInput = () => {
    setListInputOpen(true);
  };

  const openListSelect = () => {
    setListSelectOpen(true);
  };
  return (
    <Page>
      <div className="category-page">
        <div className="category-page--fixed-components">
          <LinkForm />
        </div>

        {loading && (
          <Loading />
        )}
        {!loading && category && (
        <>
          <div className="category-page--fixed-components">
            <div className="categories-div">
              <Button classname="categories-div__action" onClick={openListInput} text="+ create a new list +" />
              <Button classname="categories-div__action" onClick={openListSelect} text="- delete a list -" />
            </div>
          </div>
          <h2 className="category-page__name">{category.name}</h2>
          <div className="grid">
            <ListsContainer category={category} />
          </div>
        </>
        )}

        <Logout />
      </div>
    </Page>
  );
};

export default CategoryPage;
