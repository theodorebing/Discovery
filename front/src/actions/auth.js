export const SET_ISLOGGED = 'SET_ISLOGGED';

export const setIsLogged = (isLogged) => ({
  type: SET_ISLOGGED,
  isLogged,
});

export const LOGOUT = 'LOGOUT';

export const logout = (isLogged) => ({
  type: LOGOUT,
  isLogged,
});
