// NavBar.jsx
import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const NavBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLockExpanded, setIsLockExpanded] = useState(false);
  const [isUserEdit, setIsUserEdit] = useState(false);
  const [documents, setDocuments] = useState([]);
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();
  const {documentId} = useParams();

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

  const handleHomeClick = () => {
    navigate(`/${username}/document`);
  };

  const handleDocumentClick = (id) => {
    navigate(`/${username}/document/${id}`);
  };

  const handleHover = (boolean) => {
    if (!isLockExpanded) {
      setIsExpanded(boolean);
    }
  };
  
  const handleSettingClick = () => { 
    navigate(`/${username}/setting`)
  }

  const handleLockClick = () => {
    setIsLockExpanded(!isLockExpanded);
    setIsExpanded(!isExpanded);
  };

  const handlerSignout = () => {
    localStorage.clear();
    navigate("/signin");
  }

  return (
    <div
      className={`h-screen bg-white bg-opacity-60 text-neutral-800 transition-width duration-300 z-10 ${
        isExpanded ? "w-64" : "w-16 hover:w-64"
      }`}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <div name="nav" className="flex flex-col gap-1">
        <div className="user-info mx-[8px] pt-2 flex gap-2 items-center">
          <div className={`flex pl-[6px] pr-[8px] py-[4px] justify-center ${isExpanded ? '' : 'px-[4px]'} group hover:bg-neutral-500 hover:bg-opacity-10 hover:cursor-pointer rounded-lg`} onClick={() => handleSettingClick()}>
            <div className={` bg-neutral-300 rounded-xl size-10 mr-[8px] flex items-center justify-center ${isExpanded ? "" : "mr-0"}`}>
              <img src="/public/userface.svg" className="size-8 group-hover:rotate-45 transition duration-300 ease-out"/>
            </div>
            <div className={`${isExpanded ? "" : "hidden"}`}>
              <p className="mb-0 text-sm font-semibold">{username}</p>
              <p className="mb-0 text-xs">{email}</p>
            </div>
          </div>
          {/* <div className={`ml-auto pr-2 flex gap-2 ${isExpanded ? "" : "hidden"}`}  >
            <img
              src="/public/edit_square.svg"
              className="hover:cursor-pointer hover:scale-105 transition"
            ></img>
          </div> */}
        </div>
        <hr className="w-auto h-1 mx-[10px] my-[4px] bg-gray-100 border-0 rounded " />
        <div className="mx-[8px] flex gap-2">
          <div
            className={`flex gap-2 w-full font-semibold bg-amber-100 px-[8px] py-[4px] text-neutral-600 hover:cursor-pointer hover:bg-amber-200 rounded-md transition duration-100 ${isExpanded ? "" : "justify-center"}`}
            onClick={handleHomeClick}
          >
            <img src="/public/home.svg" />
            <span className={`${isExpanded ? "" : "hidden"}`}>Home</span>
          </div>
        </div>
        <div name="document-list" className="flex flex-col gap-1 mx-[8px]">
          <div className={`px-[8px] font-semibold `}>
            {isExpanded ? "Documents" : <hr className="w-full h-1 my-[9px] bg-gray-100 border-0 rounded " />}
          </div>
          <div className="flex flex-col">
            {documents.map((document) => (
              <div
                key={document.id}
                className={`flex gap-2 px-[8px] py-[4px] text-neutral-600 hover:cursor-pointer hover:bg-slate-500 hover:bg-opacity-10 rounded-md transition duration-100 overflow-hidden ${isExpanded ? "" : "justify-center"} ${document.id == documentId  ? "bg-slate-500 bg-opacity-10" : ""}`}
                onClick={() => handleDocumentClick(document.id)}
              >
                <span>{document.emoji ? document.emoji : "📄"}</span>
                <span className={`text-nowrap ${isExpanded ? "" : "hidden"}`}>
                  {document.title}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-[8px] flex gap-2">
          <div
            className={`flex gap-2 w-full font-semibold bg-red-100 px-[8px] py-[4px] text-neutral-600 hover:cursor-pointer hover:bg-red-200 rounded-md transition duration-100 ${isExpanded ? "" : "justify-center"}`}
            onClick={handlerSignout}
          >
            <img src="/public/logout.svg" />
            <span className={`${isExpanded ? "" : "hidden"}`}>Signout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
