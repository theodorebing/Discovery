import {
  ON_CHANGE_LINK,
  OPEN_LINK_FORM,
  CLOSE_LINK_FORM,
} from 'src/actions/link';

const initialState = {
  link: '',
  linkFormOpened: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ON_CHANGE_LINK:
      return {
        link: action.link,
      };
    case OPEN_LINK_FORM:
      return {
        linkFormOpened: true,
      };
    case CLOSE_LINK_FORM:
      return {
        linkFormOpened: false,
      };
    default:
      return state;
  }
};
