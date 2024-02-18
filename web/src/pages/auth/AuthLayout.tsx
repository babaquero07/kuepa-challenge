import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.isLoggedIn) {
      console.log(auth);
      // return navigate("/lesson/1");
    }
  }, [auth]);

  return (
    <main className="flex justify-center">
      <div className="w-full sm:w-[350px] px-10">{children}</div>
    </main>
  );
};

export default AuthLayout;
