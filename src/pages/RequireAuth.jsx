import { useContext } from "react";
import { AuthContext } from "../AuthContext"; //the context where the siblings can refer to
import { Navigate } from "react-router-dom";

//like the bouncer at a bar
//protects /dashboard
// before rendering the dashboard, it checks the context to see if isLoggedIn is true. If yes, it lets the user in. If false,
//  it immediately kicks them over to /login.
export default function RequireAuth({ children }) {
  //children is whatever was weapped in Require Auth in App.jsx. since dashboard is inside requireAuth, dashboard is children
  const authContext = useContext(AuthContext);
  if (authContext.isLoggedIn) {
    return children;
  }
  return <Navigate to="/login" />;
}

//Context allows Login and RequireAuth to read from each other directly without prop drilling
