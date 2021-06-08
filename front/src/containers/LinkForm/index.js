import { connect } from 'react-redux';
import LinkForm from 'src/components/LinkForm';
import {
  onChangeLink, openLinkForm, closeLinkForm,
} from 'src/actions/link';

const mapStateToProps = (state) => ({
  linkFormOpened: state.link.linkFormOpened,
  link: state.link.link,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeLink: (link) => dispatch(onChangeLink(link)),
  openLinkForm: () => dispatch(openLinkForm()),
  closeLinkForm: () => dispatch(closeLinkForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LinkForm);
