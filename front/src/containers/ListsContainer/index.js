import { connect } from 'react-redux';
import ListsContainer from '../../components/ListsContainer';

const mapStateToProps = (state) => ({
  link: state.link.link,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ListsContainer);
