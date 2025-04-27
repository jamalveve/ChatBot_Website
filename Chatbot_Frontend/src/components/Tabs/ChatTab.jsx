import React, { useEffect, useRef } from "react";
import UserMessage from "../UserMessage";
import BotMessage from "../BothMessage";

const ChatTab = ({
  chatbotData,
  messages,
  input,
  isTyping,
  showQuestions,
  handleQuestionClick,
  handleInputChange,
  handleSend
}) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-pink-700">
          I am here to help you!
        </h2>
      </div>

      {showQuestions && (
        <div className="mb-4">
          {chatbotData.map((item, index) => (
            <button
              key={index}
              className="bg-pink-100 text-pink-700 rounded-full px-4 py-2 m-1 hover:bg-pink-200 transition-colors"
              onClick={() => handleQuestionClick(item.question)}
            >
              {item.question}
            </button>
          ))}
        </div>
      )}

      <div className="h-96 overflow-y-auto mb-4 p-3">
        {messages.map((msg, idx) =>
          msg.sender === "user" ? (
            <UserMessage key={idx} text={msg.text} />
          ) : (
            <BotMessage key={idx} text={msg.text} />
          )
        )}
        {isTyping && (
          <div className="flex justify-start mb-2">
            <span className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700">
              Generating answer for you...
            </span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        className="flex items-center"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <input
          className="flex-1 rounded-full px-4 py-2 border border-gray-300 focus:outline-none"
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={handleInputChange}
        />
        <button
          className="bg-pink-600 text-white px-5 py-2 rounded-full ml-2 hover:bg-pink-700 transition"
          type="submit"
          aria-label="Send"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 transform rotate-90"
          >
            <path d="M3.105 8.703a1.125 1.125 0 010 1.594l4.5 4.5a1.125 1.125 0 01-1.595 1.595L2.25 11.813a6 6 0 010-8.485l4.5-4.5a1.125 1.125 0 011.595 1.595l-4.5 4.5a1.125 1.125 0 010 1.594m5.895-.203a1.125 1.125 0 011.594 0l4.5 4.5a1.125 1.125 0 01-1.595 1.595L8.25 11.813a6 6 0 010-8.485l4.5-4.5a1.125 1.125 0 011.595 1.595l-4.5 4.5a1.125 1.125 0 010 1.594" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatTab;