import { Route, Routes } from "react-router-dom";

import { PrivateRoutes, PublicRoutes } from ".";
import { adminRoutes, privateRoutes, publicRoutes } from "../routes";
import AdminRoutes from "./AdminRoute";

const App = () => {
  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<PublicRoutes>{route.element}</PublicRoutes>}
        />
      ))}
      {privateRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<PrivateRoutes>{route.element}</PrivateRoutes>}
        />
      ))}
      {adminRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<AdminRoutes>{route.element}</AdminRoutes>}
        />
      ))}
      <Route path="*" element={<h1>404 NOT FOUND</h1>} />
    </Routes>
  );
};

export default App;
