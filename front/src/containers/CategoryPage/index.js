import { connect } from 'react-redux';
import CategoryPage from 'src/components/CategoryPage';
import { withRouter } from 'react-router-dom';
import { findCategoryByName } from 'src/selectors';

const mapStateToProps = (state, ownProps) => {
  // Ici match est dans les props du container car withRouter lui donne directement
  const { params: { categoryName } } = ownProps.match;
  // On utilise un selecteur pour récupérer la recette qui nous intéresse
  const foundCategory = findCategoryByName(state.categories.categories, categoryName);
  return {
    category: foundCategory,
  };
};

const mapDispatchToProps = () => ({

});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(CategoryPage),
);
