import {
  connect,
} from 'react-redux';
import AppHeader from 'src/components/AppHeader';

const mapStateToProps = (state) => ({
  isLogged: state.auth.isLogged,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
