import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CategoryPage from '../../components/CategoryPage';
import { findCategoryById } from '../../selectors';
import { getCategories } from '../../actions/categories';

const mapStateToProps = (state, ownProps) => {
  const { params: { categoryId } } = ownProps.match;
  const foundCategory = findCategoryById(state.categories.categories, categoryId);
  return {
    category: foundCategory,
    categories: state.categories.categories,
    linkFormOpened: state.link.linkFormOpened,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(getCategories()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(CategoryPage),
);
