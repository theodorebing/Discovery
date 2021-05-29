import {
  connect,
} from 'react-redux';
import App from 'src/components/App';
import { setIsLogged } from 'src/actions/auth';

const mapStateToProps = (state) => ({
  isLogged: state.auth.isLogged,
});

const mapDispatchToProps = (dispatch) => ({
  setIsLogged: () => dispatch(setIsLogged()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
