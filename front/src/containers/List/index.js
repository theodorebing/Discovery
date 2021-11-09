import { connect } from 'react-redux';
import List from '../../components/List';

const mapStateToProps = (state) => ({
  link: state.link.link,
});

export default connect(mapStateToProps)(List);
