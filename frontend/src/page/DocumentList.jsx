import React, { useState, useEffect } from "react";
import "../App.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { timeAgo } from "../util/util";

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const { username } = useParams();

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
      console.error(error);
    }
  };

  useEffect(() => {
    getDocuments();
  }, []);

  return (
    <div className="">
      <div className="layout">
        <div className="header flex flex-col">
          <h1 className="text-4xl font-bold pt-[10rem]">Documentary List</h1>
          <div className="h-12 flex flex-row items-end">
            <button className="btn">New</button>
          </div>
        </div>
        <div className="body pt-4 flex flex-row gap-6 flex-wrap">
          {documents.map((document) => (
            <div
              key={document.id}
              className="bg-white shadow-md rounded-3xl box-border h-64 w-72 overflow-hidden flex flex-col"
            >
              {document.imageUrl && (
                <img
                  src={document.imageUrl}
                  className="w-full h-4/6 object-cover rounded-t-lg"
                />
              )}
              {!document.imageUrl && (
                <span className="bg-slate-400 w-full h-4/6 bg-opacity-40"></span>
              )}
              <span className="relative text-5xl -mt-8 ml-6 ">
                {String.fromCodePoint(0x1f600 + Math.floor(Math.random() * 80))}
              </span>
              <div className="mt-2 mx-8">
                <h2 className="text-lg font-bold text-gray-800 break-words">
                  {document.title}
                </h2>
                <span className="text-neutral-500 font-semibold">{timeAgo(document.updatedOn)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentList;
