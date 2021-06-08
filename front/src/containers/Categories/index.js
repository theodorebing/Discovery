import { connect } from 'react-redux';
import Categories from 'src/components/Categories';
import { getCategories } from 'src/actions/categories';

const mapStateToProps = (state) => ({
  categories: state.categories.categories,
});

const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(getCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
