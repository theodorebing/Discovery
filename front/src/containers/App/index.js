import {
  connect,
} from 'react-redux';
import App from '../../components/App';
import { setIsLogged } from '../../actions/auth';
import { closeLinkForm } from '../../actions/link';
import { getCategories } from '../../actions/categories';

const mapStateToProps = (state) => ({
  isLogged: state.auth.isLogged,
});

const mapDispatchToProps = (dispatch) => ({
  setIsLogged: () => dispatch(setIsLogged()),
  closeLinkForm: () => dispatch(closeLinkForm()),
  getCategories: () => dispatch(getCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
