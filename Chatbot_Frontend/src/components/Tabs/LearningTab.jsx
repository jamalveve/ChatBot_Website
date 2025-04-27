import React, { useState, useEffect } from "react";

const LearningTab = () => {
  const [links, setLinks] = useState(() => {
    const storedLinks = localStorage.getItem("learningLinks");
    return storedLinks ? JSON.parse(storedLinks) : [];
  });
  const [newLink, setNewLink] = useState({ name: "", url: "" });

  useEffect(() => {
    localStorage.setItem("learningLinks", JSON.stringify(links));
  }, [links]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLink({ ...newLink, [name]: value });
  };

  const handleAddLink = () => {
    if (newLink.name && newLink.url) {
      setLinks([...links, newLink]);
      setNewLink({ name: "", url: "" });
    }
  };

  const handleDeleteLink = (indexToDelete) => {
    setLinks(links.filter((_, index) => index !== indexToDelete));
  };

  const handleDownloadLink = (url, name) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-2">Learning Resources</h3>
      {/* Add Link Section */}
      <div className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Link Name"
          value={newLink.name}
          onChange={handleInputChange}
          className="border rounded px-2 py-1 mr-2"
        />
        <input
          type="text"
          name="url"
          placeholder="Link URL"
          value={newLink.url}
          onChange={handleInputChange}
          className="border rounded px-2 py-1 mr-2"
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleAddLink}
        >
          Add Link
        </button>
      </div>

      {/* Display Links */}
      {links.length > 0 ? (
        <ul>
          {links.map((link, index) => (
            <li
              key={index}
              className="flex items-center justify-between py-2 border-b border-gray-200"
            >
              <span>{link.name}</span>
              <div>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => handleDownloadLink(link.url, link.name)}
                >
                  Download
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDeleteLink(index)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No links added yet.</p>
      )}
    </div>
  );
};
  
export default LearningTab;
