import { connect } from 'react-redux';
import Logout from 'src/components/Logout';
import { logout } from 'src/actions/auth';
import { closeLinkForm } from 'src/actions/link';

const mapStateToProps = () => ({

});

const mapDispatchToProps = (dispatch) => ({
  handleLogout: () => dispatch(logout()),
  closeLinkForm: () => dispatch(closeLinkForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
