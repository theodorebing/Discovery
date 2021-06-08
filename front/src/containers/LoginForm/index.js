import {
  connect,
} from 'react-redux';
import LoginForm from 'src/components/LoginForm';
import { setIsLogged } from 'src/actions/auth';
import { closeLinkForm } from 'src/actions/link';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  handleLogin: () => dispatch(setIsLogged()),
  closeLinkForm: () => dispatch(closeLinkForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
