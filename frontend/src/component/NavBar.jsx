// NavBar.jsx
import React, { useState, useEffect } from "react";
import "../App.css";

const NavBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [documents, setDocuments] = useState([]);
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  useEffect(() => {
    // Fetch document list from backend
    fetch("/api/documents")
      .then((response) => response.json())
      .then((data) => setDocuments(data))
      .catch((error) => console.error("Error fetching documents:", error));
  }, []);

  return (
    <div
      className={`h-screen bg-white text-neutral-800 shadow-inner transition-width duration-300 z-10 ${
        isExpanded ? "w-64" : "w-16"
      }`}
    >
      <button onClick={() => setIsExpanded(!isExpanded)}>AAA</button>
      <div className="p-4">
        <div className="user-info mb-4 flex items-center">
          <i className="fas fa-user mr-2"></i>
          {isExpanded && (
            <div>
              <p className="text-sm">{username}</p>
              <p className="text-xs">{email}</p>
            </div>
          )}
        </div>
        <div className="document-list mb-4">
          <h3 className="text-sm">{isExpanded && "Documents"}</h3>
          <ul className="text-xs">
            {documents.map((doc) => (
              <li key={doc.id} className="flex items-center">
                <i className="fas fa-file-alt mr-2"></i>
                {isExpanded && doc.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="sidebar-buttons">
          <button className="w-full text-left text-sm mb-2 flex items-center">
            <i className="fas fa-cog mr-2"></i>
            {isExpanded && "Settings"}
          </button>
          <button className="w-full text-left text-sm flex items-center">
            <i className="fas fa-question-circle mr-2"></i>
            {isExpanded && "Help"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
