import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  checkAuthStatus,
  loginUser,
  signupUser,
} from "../helpers/api-communicator";

type User = {
  name: string;
  user: string;
  role: string;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  signUp: (name: string, user: string, password: string) => Promise<void>;
  login: (user: string, password: string) => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // fetch if the user's cookies are valid then skip login
    async function checkStatus() {
      const { user } = await checkAuthStatus();

      if (user) {
        setUser(user);
        setIsLoggedIn(true);
      }
    }

    checkStatus();
  }, []);

  const signUp = async (name: string, user: string, password: string) => {
    const { data } = await signupUser(name, user, password);

    if (data) {
      setUser({ name: data.name, user: data.user, role: data.role });
      setIsLoggedIn(true);
    }
  };

  const login = async (user: string, password: string) => {
    const { ok, user: userInfo } = await loginUser(user, password);

    if (ok && userInfo) {
      setUser(userInfo);
      setIsLoggedIn(true);
    }
  };

  const value = {
    user,
    isLoggedIn,
    signUp,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
