import {
  connect,
} from 'react-redux';
import LoginForm from '../../components/LoginForm';
import { setIsLogged } from '../../actions/auth';
import { closeLinkForm } from '../../actions/link';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  handleLogin: () => dispatch(setIsLogged()),
  closeLinkForm: () => dispatch(closeLinkForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
