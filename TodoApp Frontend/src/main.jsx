import React, { useState } from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from 'react-dom/client'
import "./styles/app.scss";
import App from "./App";
import { createContext } from "react";

export const server = "http://localhost:4000/api/v1";

export const Context = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
        user,
        setUser,
      }}
    >
      <App />
    </Context.Provider>
  );
};

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
