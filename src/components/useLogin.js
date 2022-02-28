import { useState } from 'react';

export default function useLogin() {
  const getLogin = () => {
    const tokenString = sessionStorage.getItem('login');
    const userToken = JSON.parse(tokenString);
    const val = userToken !== null && userToken !== undefined &&
                userToken.login !== null && userToken.login !== undefined;
    return val;
  };

  const [login, setLogin] = useState(getLogin());

  const saveLogin = userToken => {
    sessionStorage.setItem('login', JSON.stringify(userToken));
    setLogin(userToken.login);
  };

  return {
    setLogin: saveLogin,
    login
  }
}
