import { connect } from 'react-redux';
import Page from '../../components/Page';

const mapStateToProps = (state) => ({
  isLogged: state.auth.isLogged,
});

export default connect(mapStateToProps)(Page);
