import { useState } from "react";
import ChatItem from "./ChatItem";
import ChatInput from "./ChatInput";

const LessonChat = ({ chat }) => {
  const [messages, setMessages] = useState(chat.Messages || []);

  return (
    <div>
      <div className="bg-gray-200 rounded p-8 max-h-[500px] overflow-y-auto">
        <h1 className="text-2xl font-semibold">Live chat</h1>

        {/* Chat messages */}
        <div className="flex flex-col items-end gap-4 mt-6">
          {messages.map((message) => (
            <ChatItem message={message} key={message.id} />
          ))}
        </div>
      </div>

      {/* Chat input */}
      <ChatInput chatId={chat.id} setMessages={setMessages} />
    </div>
  );
};

export default LessonChat;
