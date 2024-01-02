import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps {
  accessToken: string | null;
  user: User;
  setAuthData: (accessToken: string, user: any) => void;
  clearAuthData: () => void;
}
interface User {
  userId: string;
  username: string;
  profileImage: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    // Read accessToken from localStorage on component mount
    return localStorage.getItem("accessToken") || null;
  });
  const [user, setUser] = useState<any>(() => {
    // Read user from localStorage on component mount
    const userString = localStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
  });

  useEffect(() => {
    // Fetch user and accessToken from localStorage on mount
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedUserString = localStorage.getItem("user");

    if (storedAccessToken && storedUserString) {
      setAccessToken(storedAccessToken);
      setUser(JSON.parse(storedUserString));
    }
    // You might want to fetch additional data from a server and update the state accordingly
  }, []);

  const setAuthData = (newAccessToken: string, newUser: any) => {
    setAccessToken(newAccessToken);
    setUser(newUser);

    // Save accessToken and user to localStorage for persistence
    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const clearAuthData = () => {
    setAccessToken(null);
    setUser(null);

    // Clear accessToken and user from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, user, setAuthData, clearAuthData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
