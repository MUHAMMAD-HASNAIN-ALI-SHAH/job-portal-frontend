import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function App() {
  const { verify, isAuthenticated, isAuthenticatedLoading } = useAuthStore();

  useEffect(() => {
    verify();
  }, [verify]);

  return (
    <div className="w-full">
      {isAuthenticatedLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-blue-500 h-10 w-10"></div>
        </div>
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/profile"
              element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/register"
              element={isAuthenticated ? <Navigate to="/" /> : <Register />}
            />
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/" /> : <Login />}
            />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
