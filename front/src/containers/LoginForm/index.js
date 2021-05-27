import {
  connect,
} from 'react-redux';
import LoginForm from 'src/components/LoginForm';
import { setIsLogged } from 'src/actions/auth';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  handleLogin: () => dispatch(setIsLogged()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
