'use client'
import { useState } from "react";
import BotMessage from "./BotMessage";
import { GetAnswers } from '@/utils/ServiceActions';

interface Message {
  user: boolean;
  text: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const sendMessage = async () => {
    if (input.trim()) {
      // const a = await GetResponseOnMessage(input);
      const answer = await GetAnswers(input);

      setMessages([...messages, { user: true, text: input }]);
      setInput("");
      // Simulate bot response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { user: false, text: answer },
        ]);
      }, 1000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="bg-[#363535] flex flex-col w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          msg.user ? (
            <div key={index} className="text-right mb-2">
              <p className="inline-block bg-blue-500 text-white p-2 rounded-md">{msg.text}</p>
            </div>
          ) : (
            <BotMessage key={index} text={msg.text} />
          )
        ))}
      </div>
      <div className="flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about movies..."
          className="flex-1 border border-gray-300 rounded-md p-2 mr-2"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;