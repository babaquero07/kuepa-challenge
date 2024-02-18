import { useState } from "react";
import { useForm } from "react-hook-form";

import clsx from "clsx";
import { IoMdSend } from "react-icons/io";
import { newMessage } from "../../../helpers/api-communicator";

type FormInput = {
  message: string;
};

const ChatInput = ({ chatId, setMessages }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit = async (data: FormInput) => {
    try {
      setErrorMessage("");

      const { newMessage: message } = await newMessage(chatId, data.message);
      // Remove chatId and userId from the message object
      const { chatId: id, userId, ...rest } = message;

      setMessages((prevMessages) => [...prevMessages, rest]);
    } catch (error) {
      console.log(error);
      setErrorMessage("Error sending message");
    } finally {
      reset();
    }
  };

  return (
    <form
      className="flex bg-gray-200 bottom-0 p-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="message"></label>
      <textarea
        id="message"
        className={clsx("bg-white rounded flex-1 p-2", {
          "border-red-500": !!errors.message,
        })}
        rows={1}
        autoFocus
        placeholder="Type your message..."
        {...register("message", { required: true })}
      />

      {errorMessage && (
        <span className="text-red-500 mb-4">{errorMessage}</span>
      )}

      <button
        type="submit"
        className="bg-blue-500 text-white rounded w-[50px] ml-2 flex justify-center items-center"
      >
        <IoMdSend className="width-[20px] height-[20px]" />
      </button>
    </form>
  );
};

export default ChatInput;
