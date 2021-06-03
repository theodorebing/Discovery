import {
  connect,
} from 'react-redux';
import App from 'src/components/App';
import { setIsLogged } from 'src/actions/auth';
import { closeLinkForm } from 'src/actions/link';

const mapStateToProps = (state) => ({
  isLogged: state.auth.isLogged,
});

const mapDispatchToProps = (dispatch) => ({
  setIsLogged: () => dispatch(setIsLogged()),
  closeLinkForm: () => dispatch(closeLinkForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
