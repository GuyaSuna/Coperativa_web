"use client";
import React, { createContext, useContext, useState } from "react";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  const login = (token) => {
    setIsAuthenticated(true);
    setAuthToken(token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAuthToken(null);
  };

  return (
    <SessionContext.Provider
      value={{ isAuthenticated, authToken, login, logout, setAuthToken }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
