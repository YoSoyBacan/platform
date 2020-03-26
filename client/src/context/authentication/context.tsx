import React, { useEffect, useState } from 'react';

export type AuthContextState = {
  authenticated: string,
  setAuthenticated: (authToken: string) => void;
  authBody: string,
  setAuthBody: (authBody: string) => void;
}

const defaultContextState: AuthContextState = {
  authenticated: '',
  setAuthenticated: (val: string) => {},
  authBody: '',
  setAuthBody: (authBody: string) => {}
}
export const AuthContext = React.createContext<AuthContextState>(defaultContextState);


export const AuthProvider: React.FC = ({ children }) => {
  const prevAuth = window.localStorage.getItem('auth') || '';
  const prevAuthBody = window.localStorage.getItem('authBody') || '';
  const [authenticated, setAuthenticated] = useState(prevAuth);
  const [authBody, setAuthBody] = useState(prevAuthBody);

  useEffect(
    () => {
      window.localStorage.setItem('authenticated', authenticated);
      window.localStorage.setItem('authBody', authBody);
    },
    [authenticated, authBody]
  );
  const defaultContext = {
    authenticated,
    setAuthenticated: (authToken: string) => {
      setAuthenticated(authToken);
    },
    authBody,
    setAuthBody: (newAuthBody: string) => {
      setAuthBody(newAuthBody);
    }
  };
  return (
    <AuthContext.Provider value={defaultContext}>
      {children}
    </AuthContext.Provider>
  )
}