import React, { useState, useRef, useEffect } from "react";
import { FaTrash, FaDownload, FaSave, FaFolderPlus, FaFileUpload } from "react-icons/fa"; // Import icons

const DocsTab = () => {
  const [folders, setFolders] = useState(() => {
    const storedFolders = localStorage.getItem("folders");
    return storedFolders ? JSON.parse(storedFolders) : [];
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [showFolderInput, setShowFolderInput] = useState(false);
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("folders", JSON.stringify(folders));
  }, [folders]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleUpload = () => {
    if (selectedFile && currentFolder !== null) {
      if (selectedFile.size > 10000000) {
        alert("File size exceeds 10MB. Please upload a smaller file.");
        return;
      }

      const updatedFolders = [...folders];
      const newDocument = {
        name: selectedFile.name,
        url: URL.createObjectURL(selectedFile),
      };
      updatedFolders[currentFolder].documents.push(newDocument);
      setFolders(updatedFolders);
      setSelectedFile(null);
    }
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      setFolders([...folders, { 
        name: newFolderName, 
        documents: [] 
      }]);
      setNewFolderName("");
      setShowFolderInput(false);
    }
  };

  const handleFolderClick = (index) => {
    setCurrentFolder(index);
  };

  const handleDeleteFile = (folderIndex, fileIndex) => {
    const updatedFolders = [...folders];
    updatedFolders[folderIndex].documents = updatedFolders[folderIndex].documents.filter(
      (_, index) => index !== fileIndex
    );
    setFolders(updatedFolders);
  };

  const handleDeleteFolder = (index) => {
    setFolders(folders.filter((_, i) => i !== index));
    if (currentFolder === index) setCurrentFolder(null);
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-2">Documentation</h3>

      {/* Folder Creation Section */}
      <div className="mb-4 relative">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => setShowFolderInput(!showFolderInput)}
        >
          + New Folder
        </button>

        {showFolderInput && (
          <div className="absolute top-0 left-0 bg-white p-2 border rounded shadow-lg">
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Folder name"
              className="mr-2 px-2 py-1 border rounded"
              ref={folderInputRef}
              autoFocus
            />
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded"
              onClick={handleCreateFolder}
            >
            <FaSave className="inline-block" />

            </button>
          </div>
        )}
      </div>

      {/* Folder List */}
      <div className="mb-4">
        {folders.map((folder, index) => (
          <div key={index} className="mb-2">
            <button
              onClick={() => handleFolderClick(index)}
              className={`${
                currentFolder === index ? "bg-gray-200" : "bg-gray-100"
              } px-4 py-2 rounded w-full text-left flex justify-between items-center`}
            >
              <span>{folder.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteFolder(index);
                }}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash className="inline-block" />
              </button>
            </button>
          </div>
        ))}
      </div>

      {/* File Management Section */}
      {currentFolder !== null && (
        <>
          <div className="mb-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded ml-2"
              onClick={handleUploadClick}
            >
              Add Files
            </button>
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
              ref={fileInputRef}
            />
            {selectedFile && (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
                onClick={handleUpload}
              >
              <FaSave className="inline-block" />

              </button>
            )}
          </div>

          {/* File List */}
          {folders[currentFolder].documents.length > 0 ? (
            <ul>
              {folders[currentFolder].documents.map((doc, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-gray-200"
                >
                  <span>{doc.name}</span>
                  <div>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                      onClick={() => handleDownload(doc.url, doc.name)}
                    >
                      <FaDownload className="inline-block" />

                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteFile(currentFolder, index)}
                    >
                      <FaTrash className="inline-block" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No documents in this folder.</p>
          )}
        </>
      )}
    </div>
  );
};

export default DocsTab;
