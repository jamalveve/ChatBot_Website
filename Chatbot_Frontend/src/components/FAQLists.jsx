import React, { useState } from 'react';

function FaqList() {
  const [faqs, setFaqs] = useState([]);

  const fetchFAQs = async () => {
    try {
      const response = await fetch("http://localhost:9095/api/chatbot/qna");
      const data = await response.json();
      setFaqs(data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={fetchFAQs}
        className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
      >
        Load FAQs
      </button>

      <ul className="mt-4 space-y-3">
        {faqs.map((item, index) => (
          <li key={index} className="bg-white shadow p-4 rounded">
            <strong>Q:</strong> {item.question} <br />
            <strong>A:</strong> {item.answer}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FaqList;
