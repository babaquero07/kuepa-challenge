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

export const getLessonById = async (id: string) => {
  const res = await axios.get(`/lesson/${id}`);

  if (res.status !== 200) {
    throw new Error("Error getting lesson");
  }

  return res.data;
};

export const newMessage = async (chatId: string, content: string) => {
  const res = await axios.post("/message/new-message", {
    chatId,
    content,
  });

  if (res.status !== 201) {
    throw new Error("Error creating message");
  }

  return res.data;
};
