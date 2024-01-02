import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";

const PublicRoutes = ({ children }: { children: React.ReactNode }) => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (accessToken) {
      navigate("/", { state: { from: location } });
    }
  }, [accessToken, location, navigate]);

  return <>{children}</>;
};

export default PublicRoutes;
