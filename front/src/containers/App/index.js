import {
  connect,
} from 'react-redux';
import App from 'src/components/App';
import { setIsLogged } from 'src/actions/auth';
import { closeLinkForm } from 'src/actions/link';
import { getCategories } from 'src/actions/categories';

const mapStateToProps = (state) => ({
  isLogged: state.auth.isLogged,
});

const mapDispatchToProps = (dispatch) => ({
  setIsLogged: () => dispatch(setIsLogged()),
  closeLinkForm: () => dispatch(closeLinkForm()),
  getCategories: () => dispatch(getCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
