import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import UserMessage from "./components/UserMessage";
import BotMessage from "./components/BothMessage";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import DocsTab from "./components/Tabs/DocTab";
import LearningTab from "./components/Tabs/LearningTab";
import { SocialLinksTab } from "./components/Tabs/SocialLinksTab";
import ChatTab from "./components/Tabs/ChatTab";
import chatbotData from "./Data/ChatbotData";

import FaqList from "./components/FAQLists";
const App = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! Ask me anything." },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true);
  const [activeTab, setActiveTab] = useState("chat");
  const [isRegistered, setIsRegistered] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const messagesEndRef = useRef(null);

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
  }

  const handleInputChange = (e) => setInput(e.target.value);
  const handleQuestionClick = (question) => {
    setInput(question);
    handleSend();
  };
  const handleTabClick = (tab) => setActiveTab(tab);
  const handleRegistrationSuccess = () => setShowLogin(true);
  const handleLoginSuccess = (user) => setLoggedInUser(user);
  const handleRegister = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setIsRegistered(true);
  };

  return (
    <Router>
      <div className="flex items-center justify-center min-h-screen">
        <Routes>
          <Route path="/" element={<Navigate to="/register" replace />} />
          <Route path="/register" element={<RegistrationForm onSuccess={handleRegistrationSuccess} />} />
          <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
          <Route
            path="/dashboard"
            element={
              loggedInUser ? (
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
                        chatbotData={chatbotData}
                        messages={messages}
                        input={input}
                        isTyping={isTyping}
                        showQuestions={showQuestions}
                        handleQuestionClick={handleQuestionClick}
                        handleInputChange={handleInputChange}
                        handleSend={handleSend}
                      />
                    )}
                    {activeTab === "docs" && <DocsTab />}
                    {activeTab === "learning" && <LearningTab />}
                    {activeTab === "social" && <SocialLinksTab />}
<FaqList/>
                  </div>
                </div>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
