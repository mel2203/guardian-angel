import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import RequireAuth from "./pages/RequireAuth";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <AuthProvider>
      {" "}
      {/*no value here, the AuthContext "children" is basically whatever that sits betweem the tags */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          {/* User will only be to dashboard if require Auth is true thats why we wrap dashboard */}
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
