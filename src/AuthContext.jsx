import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

//function if AuthCOntext . so the point of the context is so that login and
// require auth can both see if login is true or not
//Login needs to set it to true, RequireAuth needs to read it, and Context is the shared place both of them can reach that same value without you manually wiring a connection
// between two components that otherwise have nothing to do with each other.
