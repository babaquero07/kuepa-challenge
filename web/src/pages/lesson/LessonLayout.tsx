import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import NavBar from "../../components/ui/navbar/NavBar";

const LessonLayout = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.isLoggedIn) {
      return navigate("/login");
    }
  }, [auth]);

  return (
    <>
      <NavBar />
      <main className="w-full p-10">{children}</main>;
    </>
  );
};

export default LessonLayout;
