import React, { useEffect, useState } from 'react';

//TODO fixthissss -> globalStore
interface AuthBody {
  legalName: string;
  businessId: string;
  legalId: string;
  userId: string;
  firstName: string;
}
export type AuthContextState = {
  authenticated: boolean;
  authToken: string;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setAuthToken: (token: string) => void;
  authBody: AuthBody | null;
  setAuthBody: (authBody: AuthBody) => void;
};

const defaultContextState: AuthContextState = {
  authenticated: false,
  authToken: "",
  setAuthenticated: (isAuth: boolean) => {},
  setAuthToken: (token: string) => {},
  authBody: null,
  setAuthBody: (authBody: AuthBody) => {},
};

export const AuthContext = React.createContext<AuthContextState>(
  defaultContextState
);

export const AuthProvider: React.FC = ({ children }) => {
  const prevAuthToken = window.localStorage.getItem("auth") || "";
  const prevAuthBody = window.localStorage.getItem("authBody") || null;

  const parsedAuthBody = prevAuthBody
    ? (JSON.parse(prevAuthBody) as AuthBody)
    : null;

  const [authToken, setAuthToken] = useState(prevAuthToken);
  const [authenticated, setAuthenticated] = useState(!!prevAuthToken);
  const [authBody, setAuthBody] = useState(parsedAuthBody);

  useEffect(() => {
    window.localStorage.setItem("auth", authToken);
    window.localStorage.setItem("authBody", JSON.stringify(authBody));
  }, [authenticated, authBody, authToken]);

  const defaultContext = {
    authenticated,
    setAuthenticated,
    authToken,
    setAuthToken,
    authBody,
    setAuthBody,
  };
  return (
    <AuthContext.Provider value={defaultContext}>
      {children}
    </AuthContext.Provider>
  );
};
