import React, { useContext, useState, createContext } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const token = Cookies.get("jwt") || sessionStorage.getItem("token");
  const [authUser, setAuthUser] = useState(token ? JSON.parse(token) : undefined);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Correct custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
