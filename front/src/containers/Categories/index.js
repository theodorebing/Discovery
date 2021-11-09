import { connect } from 'react-redux';
import Categories from '../../components/Categories';
import { getCategories } from '../../actions/categories';

const mapStateToProps = (state) => ({
  categories: state.categories.categories,
  linkFormOpened: state.link.linkFormOpened,
});

const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(getCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
