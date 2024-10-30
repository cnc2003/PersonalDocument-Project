// NavBar.jsx
import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [documents, setDocuments] = useState([]);
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();
  const getDocuments = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/documents`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT token
        },
        withCredentials: true, // Ensure credentials are sent
      });
      setDocuments(response.data);
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/signin");
      }
    }
  };

  useEffect(() => {
    getDocuments();
  }, []);

  return (
    <div
      className={`h-screen bg-white bg-opacity-60 text-neutral-800 transition-width duration-300 z-10 ${
        isExpanded ? "w-64" : "w-16"
      }`}
    >
      {/* <button onClick={() => setIsExpanded(!isExpanded)}>AAA</button> */}
      <div name="nav" className="">
        <div className="user-info mx-[8px] pt-2 flex gap-2 items-center">
          <div className="flex px-[8px] py-[4px]">
            <div className="bg-slate-300 rounded-xl size-10 mr-[8px]"></div>
            <div className="cursor-pointer">
              <p className="text-sm font-semibold">{username}</p>
              <p className="text-xs">{email}</p>
            </div>
          </div>
          <div className="ml-auto pr-2">
            <img
              src="/public/edit_square.svg"
              className="hover:cursor-pointer hover:scale-105 transition"
            ></img>
          </div>
        </div>

        <hr className="w-auto h-1 mx-[10px] my-[4px] bg-gray-100 border-0 rounded " />

        <div name="document-list" className="flex flex-col gap-1 mx-[8px]">
          <div className="px-[8px] font-semibold">Documents</div>
          {documents.map((document) => (
            <div
              key={document.id}
              className="flex gap-2 px-[8px] py-[4px] text-neutral-600 hover:cursor-pointer hover:bg-slate-500 hover:bg-opacity-10 rounded-md transition duration-100"
              onClick={() => navigate(`/${username}/document/${document.id}`)}
            >
              <span>{document.emoji ? document.emoji : "📄"}</span>
              <span>{document.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
