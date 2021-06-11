import { connect } from 'react-redux';
import ListsContainer from 'src/components/ListsContainer';

const mapStateToProps = (state) => ({
  link: state.link.link,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ListsContainer);
