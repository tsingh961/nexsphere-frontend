"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Send, Smile, Paperclip } from "lucide-react";

const ChatMessages = ({ messages, user }) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    // Handle sending message (backend integration required)
    console.log("Sending message:", newMessage);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-full bg-black text-white p-4">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === user ? "justify-end" : "justify-start"}`}
          >
            {msg.sender !== user && (
              <Image
                src={msg.avatar}
                alt="Avatar"
                width={35}
                height={35}
                className="rounded-full mr-2"
              />
            )}
            <div
              className={`max-w-[70%] p-3 rounded-lg text-sm shadow-md ${
                msg.sender === user ? "bg-blue-600 text-white" : "bg-gray-800 text-white"
              }`}
            >
              {msg.reply && (
                <div className="text-xs text-gray-400 mb-1 border-l-2 border-gray-500 pl-2">
                  {msg.reply}
                </div>
              )}
              {msg.text}
              <div className="text-xs text-gray-400 mt-1 text-right">{msg.timestamp}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="border-t border-gray-700 p-3 flex items-center bg-gray-900 rounded-xl mt-2">
        <button className="text-gray-400 hover:text-white">
          <Smile size={24} />
        </button>
        <button className="text-gray-400 hover:text-white mx-3">
          <Paperclip size={24} />
        </button>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Message..."
          className="flex-1 bg-transparent outline-none text-white placeholder-gray-500"
        />
        <button onClick={sendMessage} className="text-blue-500 hover:text-blue-400">
          <Send size={24} />
        </button>
      </div>
    </div>
  );
};

export default ChatMessages;
