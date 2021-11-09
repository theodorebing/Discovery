import { connect } from 'react-redux';
import ListsContainer from '../../components/ListsContainer';

const mapStateToProps = (state) => ({
  link: state.link.link,
});

export default connect(mapStateToProps)(ListsContainer);
