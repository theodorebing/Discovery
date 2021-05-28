export const SET_ISLOGGED = 'SET_ISLOGGED';

export const setIsLogged = (isLogged, id) => ({
  type: SET_ISLOGGED,
  isLogged,
  id,
});

export const LOGOUT = 'LOGOUT';

export const logout = (isLogged) => ({
  type: LOGOUT,
  isLogged,
});
