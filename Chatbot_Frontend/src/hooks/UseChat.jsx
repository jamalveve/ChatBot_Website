// hooks/useChat.js
import { useState } from "react";
// hooks/useChat.js
import React from 'react'; // Add this import at the top

const useChat = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! Ask me anything." },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("http://localhost:9098/api/chatbot/qna", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botMsg = { sender: "bot", text: data.answer };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Oops! Something went wrong." },
      ]);
    }

    setIsTyping(false);
  };

  const handleInputChange = (e) => setInput(e.target.value);
  const handleQuestionClick = (question) => {
    setInput(question);
    handleSend();
  };
  const handleTabClick = (tab) => setActiveTab(tab); // Handle tab switching logic

  // You can return JSX to be used in App.jsx or directly render inside this hook
  const renderTabs = () => (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl relative">
      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-t-3xl">
        {["chat", "docs", "learning", "social"].map((tab) => (
          <button
            key={tab}
            className={`flex-grow py-4 rounded-t-3xl ${
              activeTab === tab
                ? "bg-pink-600 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "chat" && (
          <ChatTab
            messages={messages}
            input={input}
            isTyping={isTyping}
            handleQuestionClick={handleQuestionClick}
            handleInputChange={handleInputChange}
            handleSend={handleSend}
          />
        )}
        {activeTab === "docs" && <DocsTab />}
        {activeTab === "learning" && <LearningTab />}
        {activeTab === "social" && <SocialLinksTab />}
      </div>
    </div>
  );

  return {
    renderTabs, // Expose renderTabs to be used in App.jsx
    messages,
    input,
    isTyping,
    handleSend,
    handleInputChange,
    handleQuestionClick,
  };
};

export default useChat;
