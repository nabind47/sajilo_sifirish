import ImageUpload from "./components/ImageUpload";
import { Dashboard, Home, Signin, Signup, VerifyOtp } from "./pages";

export const publicRoutes = [
  { path: "/signin", element: <Signin /> },
  { path: "/signup", element: <Signup /> },
  { path: "/:userId/verify", element: <VerifyOtp /> },
];

export const privateRoutes = [
  { path: "/", element: <Home /> },
  { path: "/abc", element: <ImageUpload /> },
  { path: "/dashboard", element: <Dashboard /> },
];
