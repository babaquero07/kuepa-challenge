import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";

import LoginForm from "./ui/LoginForm";

const NewAccountPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.isLoggedIn) {
      console.log(auth);
      // return navigate("/lesson/1");
    }
  }, [auth]);

  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className="text-4xl mb-5">Login</h1>

      <LoginForm />
    </div>
  );
};

export default NewAccountPage;
