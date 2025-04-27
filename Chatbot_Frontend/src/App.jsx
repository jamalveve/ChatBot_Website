import React from "react";

import UserMessage from "./components/UserMessage";
import BotMessage from "./components/BothMessage";
import  { useState, useRef, useEffect } from "react";
import RegistrationForm from "./components/RegistrationForm";
import DocsTab from "./components/Tabs/DocTab";
import LearningTab from "./components/Tabs/LearningTab";
import { SocialLinksTab } from "./components/Tabs/SocialLinksTab";
import LoginForm from "./components/LoginForm";
import { BrowserRouter as Router,
  Routes,
    Route,
    Link,
    useNavigate,
    Navigate,
 } from 'react-router-dom';


const App = () => {
  const [messages, setMessages] = useState([{
      sender: "bot",
      text: "Hello! Ask me anything."
  }]);
  // const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true);
  const [activeTab, setActiveTab] = useState("chat");
  const [isRegistered, setIsRegistered] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loggedInUser , setLoggedInUser ] = useState(null);
  const messagesEndRef = useRef(null);
  const [input, setInput] = useState("");


  const chatbotData = [
    { question: "Hello", answer: "Hi! How can I help you today?" },
    { question: "what is your name", answer: "I'm your friendly chatbot assistant." },
    { question: "how are you", answer: "I'm just code, but I'm running great!" },
    { question: "which river is the longest", answer: "The Amazon River spans around 4,345 miles!" },
    { question: "who is your creator", answer: "Jamal Veve M" },
    {
        question: "react project setup",
        answer: `Here's how to create a React project with Vite:
        1. 🚀 Run this: \`npm create vite@latest ./ -- --template react\`
        2. ✍️ Set a project name.
        3. 📦 Run \`npm install\`
        4. ⚙️ Run \`npm run dev\`
        🎉 You're ready!`
    },
    {
        question: "guide on tailwind",
        answer: `To install Tailwind in a Vite project:
        1. \`npm install -D tailwindcss postcss autoprefixer\`
        2. \`npx tailwindcss init -p\`
        3. Edit \`tailwind.config.js\`:
        \`\`\`js
        module.exports = {
        content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
        theme: { extend: {} },
        plugins: [],
        };
        \`\`\`
        4. Add to \`index.css\`:
        \`\`\`css
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
        \`\`\`
        5. Import \`index.css\` in \`main.jsx\`
        🎉 Done!`
    }
];

  useEffect(() => {
      scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({
          behavior: "smooth"
      });
  };

  // const handleSend = async () => {
  //     if (!input.trim()) return;
  //     const userMsg = {
  //         sender: "user",
  //         text: input
  //     };
  //     setMessages((prev) => [...prev, userMsg]);
  //     setInput("");
  //     setIsTyping(true);

  //     const response = await fetch("http://localhost:9094/api/chatbot/qna", {
  //         method: "POST",
  //         headers: {
  //             "Content-Type": "application/json"
  //         },
  //         body: JSON.stringify({
  //             message: input
  //         })
  //     });

  //     if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();
  //     const botMsg = {
  //         sender: "bot",
  //         text: data.answer
  //     };
  //     setMessages((prev) => [...prev, botMsg]);
  //     setIsTyping(false);
  // };

  const handleSend = async () => {
    if (!input.trim()) return;
  
    const userMsg = {
      sender: "user",
      text: input
    };
  
    // Add user message and reset input
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setShowQuestions(false); // Hide questions after user sends a message
  
    try {
      const response = await fetch("http://localhost:9097/api/chatbot/qna", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: input })
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      const botMsg = {
        sender: "bot",
        text: data.answer
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      // Show error as a bot message
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "Sorry, something went wrong. Please try again." }
      ]);
    } finally {
      setIsTyping(false);
    }
  };
  
  
  const handleInputChange = (e) => { setInput(e.target.value); };
 
 

  const handleQuestionClick = async (question) => {
      setInput(question);
      handleSend();
  };

  const handleTabClick = (tab) => {
      setActiveTab(tab);
  };

  const handleRegistrationSuccess = () => {
      setShowLogin(true);
  };

  const handleLoginSuccess = (user) => {
      setLoggedInUser (user);
  };

 
  // ADDED: Handle registration
  const handleRegister = (userData) => {
      localStorage.setItem("user", JSON.stringify(userData));
      setIsRegistered(true);
  };

  return (
    <Router>
      <div className="flex items-center justify-center min-h-screen">

    <Routes>
      <Route
        path="/"
        element={<Navigate to="/register" replace />}
      />
      <Route
        path="/register"
        element={<RegistrationForm onSuccess={handleRegistrationSuccess} />}
      />
      <Route
        path="/login"
        element={<LoginForm onLoginSuccess={handleLoginSuccess} />}
      />
      <Route
        path="/dashboard"
        element={ 
          loggedInUser ? (
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl relative">
            <div className="flex bg-gray-100 rounded-t-3xl">
  <button
    className={`flex-grow py-4 rounded-t-3xl 
      ${activeTab === "chat"
        ? "bg-pink-600 text-white shadow-md"
        : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"}
    `}
    onClick={() => handleTabClick("chat")}
  >
    Chat
  </button>
  <button
    className={`flex-grow py-4 rounded-t-3xl
      ${activeTab === "docs"
        ? "bg-pink-600 text-white shadow-md"
        : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"}
    `}
    onClick={() => handleTabClick("docs")}
  >
    Docs
  </button>
  <button
    className={`flex-grow py-4 rounded-t-3xl
      ${activeTab === "learning"
        ? "bg-pink-600 text-white shadow-md"
        : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"}
    `}
    onClick={() => handleTabClick("learning")}
  >
    Learning
  </button>
  <button
    className={`flex-grow py-4 rounded-t-3xl
      ${activeTab === "social"
        ? "bg-pink-600 text-white shadow-md"
        : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"}
    `}
    onClick={() => handleTabClick("social")}
  >
    Social
  </button>
</div>

            <div className="p-6">
                {activeTab === "chat" && (
                    <div>
                        <div className="text-center mb-4">
                            <h2 className="text-2xl font-bold text-pink-700">
                                I am here to help you!
                            </h2>
                            <div className="absolute left-4 top-4">
                                <button className="text-gray-600 hover:text-gray-800">
                                    {/* Optional button */}
                                </button>
                            </div>
                            <div className="absolute right-4 top-4">
                                <button className="text-gray-600 hover:text-gray-800">
                                    {/* Optional button */}
                                </button>
                          


                            </div>
                        </div>
                        {showQuestions && (
                            <div className="mb-4">
                                {chatbotData.map((item, index) => (
                                    <button key={index}
                                        className="bg-pink-100 text-pink-700 rounded-full px-4 py-2 m-1 hover:bg-pink-200 transition-colors"
                                        onClick={() => handleQuestionClick(item.question)}>
                                        {item.question}
                                    </button>
                                ))}
                            </div>
                        )}
                        <div className="h-96 overflow-y-auto mb-4 p-3">
                            {messages.map((msg, idx) => {
                                if (msg.sender === "user") {
                                    return (
                                        <UserMessage key={idx}
                                            text={msg.text}
                                            sender={msg.sender} />
                                    );
                                } else {
                                    return (
                                        <BotMessage key={idx}
                                            text={msg.text}
                                            sender={msg.sender} />
                                    );
                                }
                            })}
                            {isTyping && (
                                <div className="flex justify-start mb-2">
                                    <span className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700">
                                        Generating answer for you...
                                    </span>
                                </div>
                            )}
                            <div ref={messagesEndRef} />

                        </div>
                         {/* Input Form */}
                          <form className="flex items-center" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
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
                                      xmlns="http://
                           www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      className="w-5 h-5 transform rotate-90"
                                  >
                                      <path d="M3.105 8.703a1.125 1.125 0 010 1.594l4.5 4.5a1.125 1.125 0 01-1.595 1.595L2.25 11.813a6 6 0 010-8.485l4.5-4.5a1.125 1.125 0 011.595 1.595l-4.5 4.5a1.125 1.125 0 010 1.594m5.895-.203a1.125 1.125 0 011.594 0l4.5 4.5a1.125 1.125 0 01-1.595 1.595L8.25 11.813a6 6 0 010-8.485l4.5-4.5a1.125 1.125 0 011.595 1.595l-4.5 4.5a1.125 1.125 0 010 1.594" />
                                  </svg>
                              </button>
                          </form>
                     </div>
                  )}
                  {activeTab === "docs" && <DocsTab />}
           
                {activeTab === "docs" && <DocsTab />}
                {activeTab === "learning" && <LearningTab />}
                {activeTab === "social" && <SocialLinksTab />}
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
