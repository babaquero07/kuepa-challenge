import { TbClockHour4 } from "react-icons/tb";

const ChatItem = ({ message }) => {
  return (
    <div className="w-[300px] bg-white rounded gap-2 p-4">
      <h2 className="text-sm font-semibold">
        {message.User.name} - {message.User.role}
      </h2>
      <p className="text-sm mt-2">{message.content}</p>

      <div className="flex mt-2 justify-end">
        <TbClockHour4 />
        <span className="text-xs ml-2">
          {new Date(message.dateSent).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default ChatItem;
