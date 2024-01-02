import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import { Signin } from "./pages/Signin";
import { SignupForm } from "./pages/Signup";

import ImageUplaod from "./components/ImageUpload";
import { Toaster } from "./components/ui/toaster";
import { useAuth } from "./context/useAuth";
import VerifyOtp from "./pages/VerifyOtp";

import Layout from "./pages/Layout";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/abc" element={<ImageUplaod />} />
          <Route path="/:userId/verify" element={<VerifyOtp />} />

          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

function RequireAuth() {
  let { accessToken } = useAuth();
  let location = useLocation();

  if (!accessToken) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return <Outlet />;
}

export default App;
