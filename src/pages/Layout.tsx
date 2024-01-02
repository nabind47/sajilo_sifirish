import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <nav>
        <h1>Navigation</h1>
      </nav>

      <Outlet />
    </div>
  );
};

export default Layout;
