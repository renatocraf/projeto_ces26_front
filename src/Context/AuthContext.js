import React, { createContext, useState, useEffect } from 'react';

import useAuth from './hooks/useAuth';

const Context = createContext();

function AuthProvider({ children }) {
  const {
    authenticated, loading, sucess, sucessCad, google, aux,
    handleLogin,  handleLogout,  setEmail,  setPassword, setUserName,setConfirmPassword,
    setSucessCad, handleCadastro, responseGoogle 
  } = useAuth();

  return (
    <Context.Provider value={{  authenticated, loading, sucess, sucessCad, google, aux,
                                handleLogin,  handleLogout,  setEmail,  setPassword, setUserName,setConfirmPassword,
                                setSucessCad, handleCadastro, responseGoogle}}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
