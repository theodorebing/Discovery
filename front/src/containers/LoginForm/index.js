import {
  connect,
} from 'react-redux';
import LoginForm from 'src/components/LoginForm';
import { setIsLogged } from 'src/actions/auth';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  handleLogin: (id) => dispatch(setIsLogged(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
