import { connect } from 'react-redux';
import Logout from '../../components/Logout';
import { logout } from '../../actions/auth';
import { closeLinkForm } from '../../actions/link';

const mapDispatchToProps = (dispatch) => ({
  handleLogout: () => dispatch(logout()),
  closeLinkForm: () => dispatch(closeLinkForm()),
});

export default connect(mapDispatchToProps)(Logout);
