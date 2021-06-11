import { connect } from 'react-redux';
import List from 'src/components/List';

const mapStateToProps = (state) => ({
  link: state.link.link,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
