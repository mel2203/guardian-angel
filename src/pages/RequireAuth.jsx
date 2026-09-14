import { useContext } from "react";
import { AuthContext } from "../AuthContext"; //the context where the siblings can refer to
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const authContext = useContext(AuthContext); //---> this is from the contxt, we set is as token
  //if there is no token, go back to login page
  if (authContext.isLoggedIn) {
    return children;
  }
  return <Navigate to="/login" />;
}

//Context allows Login and RequireAuth to read from each other directly without prop drilling
