import { Link } from "react-router-dom";

import useAuth from "@/context/useAuth";

const Navbar = () => {
  const { clearAuthData } = useAuth();

  return (
    <nav>
      <ul className="flex items-center justify-center border-b py-4 gap-10">
        <li className="text-primary underline-offset-4 hover:underline">
          <Link to="/">Home</Link>
        </li>
        <li className="text-primary underline-offset-4 hover:underline">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <button
          className="text-primary underline-offset-4 hover:underline"
          onClick={clearAuthData}
        >
          Logout
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;
