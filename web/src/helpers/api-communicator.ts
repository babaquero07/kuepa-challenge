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
