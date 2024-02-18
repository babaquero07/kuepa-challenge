import { useState } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";

import { Link } from "react-router-dom";

type FormInputs = {
  name: string;
  user: string;
  password: string;
};

const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit = async (data: FormInputs) => {
    setErrorMessage("");

    const { name, user, password } = data;

    console.log("Name:", name, "User:", user, "Password:", password);
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="text">Name</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": !!errors.name,
        })}
        type="text"
        autoFocus
        {...register("name", { required: true })}
      />

      <label htmlFor="text">User</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": !!errors.user,
        })}
        type="text"
        autoFocus
        {...register("user", { required: true })}
      />

      <label htmlFor="password">Password</label>
      <input
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

      <Link to="/login" className="btn-secondary text-center">
        Login
      </Link>
    </form>
  );
};

export default RegisterForm;
