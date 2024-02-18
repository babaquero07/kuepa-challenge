import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import clsx from "clsx";
import toast from "react-hot-toast";

import { useAuth } from "../../../../context/AuthContext";

type FormInputs = {
  user: string;
  password: string;
};

const LoginForm = () => {
  const auth = useAuth();

  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit = async (data: FormInputs) => {
    setErrorMessage("");

    const { user, password } = data;

    try {
      toast.loading("Logging in...", { id: "login" });
      await auth?.login(user, password);

      toast.success("Signed in successfully!", {
        id: "login",
      });
    } catch (error) {
      console.log(error);

      setErrorMessage("Error signing in");
      toast.error("Signing in failed.", { id: "login" });
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="user">User</label>
      <input
        id="user"
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": !!errors.user,
        })}
        type="text"
        autoFocus
        {...register("user", { required: true })}
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": !!errors.password,
        })}
        type="password"
        {...register("password", { required: true, minLength: 8 })}
      />

      {errorMessage && (
        <span className="text-red-500 mb-4">{errorMessage}</span>
      )}

      <button type="submit" className="btn-primary">
        Continue
      </button>

      {/* divisor line */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link to="/new-account" className="btn-primary text-center">
        Sign up
      </Link>
    </form>
  );
};

export default LoginForm;
