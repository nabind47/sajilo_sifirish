import { Route, Routes } from "react-router-dom";

import { PrivateRoutes, PublicRoutes } from "./layouts";
import { privateRoutes, publicRoutes } from "./routes";

import { Toaster } from "./components/ui/toaster";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <>
      <Toaster />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
