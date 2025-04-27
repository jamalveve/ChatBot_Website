import React, { useEffect, useRef, useState } from "react";
import UserMessage from "../UserMessage";
import BotMessage from "../BothMessage";
import { useFeatureFlags } from "../FeatureFlags";

const ChatTab = ({
  chatbotData,
  messages,
  setMessages,
  input,
  setInput,
  isTyping,
  setIsTyping,
  showQuestions,
  handleQuestionClick,
}) => {
  const messagesEndRef = useRef(null);
  const [faqs, setFaqs] = useState([]);
  const flags = useFeatureFlags();

  // Teach mode state
  const [teachMode, setTeachMode] = useState(false);
  const [pendingQuestion, setPendingQuestion] = useState("");
  const [userAnswer, setUserAnswer] = useState("");

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load FAQs handler
  const handleLoadFaqs = async () => {
    try {
      const response = await fetch("http://localhost:9098/api/chatbot/faqs");
      const data = await response.json();
      setFaqs(data);
    } catch (error) {
      alert("Failed to load FAQs.");
    }
  };

  // Send message handler (with teach mode trigger)
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

      // If bot doesn't know the answer and teach mode is enabled
      if (
        flags.learningMode &&
        data.answer &&
        data.answer.toLowerCase().includes("learning mode is on")
      ) {
        setTeachMode(true);
        setPendingQuestion(input);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Oops! Something went wrong." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Teach mode modal submit handler
  const handleTeachSubmit = async () => {
    await fetch("http://localhost:9098/api/chatbot/teach", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: pendingQuestion,
        answer: userAnswer,
      }),
    });
    setTeachMode(false);
    setUserAnswer("");
    setPendingQuestion("");
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: "Thanks! I've learned a new answer." },
    ]);
  };

  return (
    <div>
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-pink-700">
          I am here to help you!
        </h2>
      </div>

      {/* Teach Mode Button (manual trigger, optional) */}
      {flags.learningMode && !teachMode && (
        <button
          onClick={() => setTeachMode(true)}
          className="bg-pink-600 text-white px-4 py-2 rounded mb-4"
        >
          Teach the Bot
        </button>
      )}

      {/* Teach Mode Modal */}
      {teachMode && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-2">Teach the Bot</h3>
            <p className="mb-2">
              What should the bot reply to:{" "}
              <strong>{pendingQuestion}</strong>?
            </p>
            <input
              type="text"
              className="border px-2 py-1 rounded w-full mb-2"
              value={userAnswer}
              onChange={e => setUserAnswer(e.target.value)}
              placeholder="Enter the correct answer"
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-300 px-4 py-2 rounded mr-2"
                onClick={() => {
                  setTeachMode(false);
                  setUserAnswer("");
                  setPendingQuestion("");
                }}
              >
                Cancel
              </button>
              <button
                className="bg-pink-600 text-white px-4 py-2 rounded"
                onClick={handleTeachSubmit}
                disabled={!userAnswer.trim()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Show suggested questions */}
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

      {/* Chat messages */}
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

      {/* Input form */}
      <form
        className="flex items-center"
        onSubmit={e => {
          e.preventDefault();
          handleSend();
        }}
      >
        <input
          className="flex-1 rounded-full px-4 py-2 border border-gray-300 focus:outline-none"
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={e => setInput(e.target.value)}
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
        <button
          type="button"
          className="bg-yellow-500 text-white px-5 py-2 rounded-full ml-2 hover:bg-yellow-600 transition"
          aria-label="Load FAQs"
          onClick={handleLoadFaqs}
        >
          {/* FAQ (question mark) icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 14v2m0-6a4 4 0 11-8 0 4 4 0 018 0zm0 0a4 4 0 014 4v1a1 1 0 01-1 1h-1"
            />
          </svg>
        </button>
      </form>
      {/* FAQs */}
      {faqs.length > 0 && (
        <ul className="mt-4 space-y-3">
          {faqs.map((item, index) => (
            <li key={index} className="bg-white shadow p-4 rounded">
              <strong>Q:</strong> {item.question} <br />
              <strong>A:</strong> {item.answer}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatTab;
