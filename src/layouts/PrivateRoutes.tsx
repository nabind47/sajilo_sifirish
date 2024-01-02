import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "@/components/Navbar";
import useAuth from "@/context/useAuth";

const PrivateRoutes = ({ children }: { children: React.ReactNode }) => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin", { state: { from: location } });
    }
  }, [accessToken, location, navigate]);

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default PrivateRoutes;
