import { Dashboard, Home, Signin, Signup, VerifyOtp } from "./pages";

export const publicRoutes = [
  { path: "/signin", element: <Signin /> },
  { path: "/signup", element: <Signup /> },
  { path: "/:userId/verify", element: <VerifyOtp /> },
];

export const privateRoutes = [
  { path: "/", element: <Home /> },
  { path: "/dashboard", element: <Dashboard /> },
];
