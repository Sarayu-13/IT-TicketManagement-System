import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../types/types";

export type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  googleLogin: (googleData: any) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Mock users database
  const users: User[] = [
    { id: "1", username: "admin", password: "admin123", role: "admin" },
    { id: "2", username: "user1", password: "user123", role: "user" },
  ];

  const login = async (username: string, password: string) => {
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const googleLogin = async (googleData: any) => {
    // In a real app, you would verify the token with your backend
    // For this example, we'll create a user from Google data
    const googleUser: User = {
      id: googleData.sub,
      username: googleData.email,
      password: "", // Not needed for Google auth
      role: "user", // Default role for Google users
    };

    setUser(googleUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, googleLogin, logout }}>
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
