import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "../pages/Login";
import { useAuth } from "../hooks/useAuth";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Trending from "../pages/Trending";
import Gaming from "../pages/Gaming";
import VideoDetails from "../pages/VideoDetails";
import SavedVideos from "../pages/Saved";

// ✅ Route guard for authenticated users
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuth();

  return isAuthenticated ? (
    <Layout>{children}</Layout>
  ) : (
    <Navigate to="/login" replace />
  );
};

// ✅ Prevent logged-in users from accessing the login page
const LoginRoute = ({ children }) => {
  const isAuthenticated = useAuth();
  return !isAuthenticated ? children : <Navigate to="/" replace />;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* 👇 Login Route (blocked if already logged in) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trending"
          element={
            <ProtectedRoute>
              <Trending />
            </ProtectedRoute>
          }
        />{" "}
        <Route
          path="/gaming"
          element={
            <ProtectedRoute>
              <Gaming />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved"
          element={
            <ProtectedRoute>
              <SavedVideos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/video/:videoId"
          element={
            <ProtectedRoute>
              <VideoDetails />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <LoginRoute>
              <Login />
            </LoginRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
