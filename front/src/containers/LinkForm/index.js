import { connect } from 'react-redux';
import LinkForm from '../../components/LinkForm';
import {
  onChangeLink, openLinkForm, closeLinkForm,
} from '../../actions/link';
import { setCategories, getCategories } from '../../actions/categories';

const mapStateToProps = (state) => ({
  linkFormOpened: state.link.linkFormOpened,
  link: state.link.link,
  categories: state.categories.categories,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeLink: (link) => dispatch(onChangeLink(link)),
  openLinkForm: () => dispatch(openLinkForm()),
  closeLinkForm: () => dispatch(closeLinkForm()),
  setCategories: () => dispatch(setCategories()),
  getCategories: () => dispatch(getCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LinkForm);
