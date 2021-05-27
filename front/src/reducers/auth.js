import {
  SET_ISLOGGED,
  LOGOUT,
} from 'src/actions/auth';

const initialState = {
  isLogged: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ISLOGGED:
      return {
        isLogged: true,
      };
    case LOGOUT:
      return {
        isLogged: false,
      };
    default:
      return state;
  }
};
