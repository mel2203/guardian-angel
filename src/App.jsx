import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import RequireAuth from "./pages/RequireAuth";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <AuthProvider>
      {" "}
      {/*no value here, the AuthContext "children" is basically whatever that sits betweem the tags */}
      <BrowserRouter>
        {" "}
        {/*  For url navigation*/}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          {/* User will only go to dashboard if require Auth is true thats why we wrap dashboard */}
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                {" "}
                {/* Means this is a protected route */}
                <Dashboard />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
