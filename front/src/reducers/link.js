import {
  ON_CHANGE_LINK,
  OPEN_LINK_FORM,
  CLOSE_LINK_FORM,
} from '../actions/link';

const initialState = {
  link: '',
  linkFormOpened: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ON_CHANGE_LINK:
      return {
        ...state,
        link: action.link,
      };
    case OPEN_LINK_FORM:
      return {
        ...state,
        linkFormOpened: true,
      };
    case CLOSE_LINK_FORM:
      return {
        ...state,
        linkFormOpened: false,
        link: '',
      };
    default:
      return state;
  }
};
