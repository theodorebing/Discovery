import { connect } from 'react-redux';
import Categories from 'src/components/Categories';
import { logout } from 'src/actions/auth';

const mapStateToProps = () => ({

});

const mapDispatchToProps = (dispatch) => ({
  handleLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
