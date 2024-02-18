import axios from "axios";

export const signupUser = async (
  name: string,
  user: string,
  password: string
) => {
  const res = await axios.post("/user/sign-up", {
    name,
    user,
    password,
  });

  if (res.status !== 201) {
    throw new Error("Error creating user");
  }

  return res.data;
};

export const loginUser = async (user: string, password: string) => {
  const res = await axios.post("/user/login", {
    user,
    password,
  });

  if (res.status !== 200) {
    throw new Error("Error logging in");
  }

  return res.data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status");

  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }

  return res.data;
};
