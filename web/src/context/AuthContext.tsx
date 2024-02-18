import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { signupUser } from "../helpers/api-communicator";

type User = {
  name: string;
  user: string;
  role: string;
};

type UserAuth = {
  signUp: (name: string, user: string, password: string) => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const signUp = async (name: string, user: string, password: string) => {
    const data = await signupUser(name, user, password);

    if (data) {
      setUser({ name: data.name, user: data.user, role: data.role });
      setIsLoggedIn(true);
    }
  };

  const value = {
    signUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
