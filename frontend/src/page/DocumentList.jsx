import React, { useState, useEffect } from "react";
import "../App.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { timeAgo } from "../util/util";
import FloatingEmojis from "../component/FloatingEmojis";
import NavBar from "../component/NavBar";

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
      {/* <FloatingEmojis /> */}
      <span className="bg- [#F9F6EE] waffle-bg w-screen h-screen fixed -z-10"></span>
      <div className="flex flex-row">
        <aside className="w-64 fixed">
          <NavBar />
        </aside>
        <section className="ml-64">
          <div className="flex flex-col md:mx-[8rem] mx-[3rem]">
            <div className="flex flex-col">
              <h1 className="text-4xl font-bold pt-[10rem]">
                Documentary List
              </h1>
              <p className="text-neutral-500 italic">
                Let's write your journal.
              </p>
              <div className="h-12 flex flex-row items-end">
                <button className="btn">New</button>
              </div>
            </div>
            <div className="pt-4 flex flex-row gap-6 flex-wrap">
              {documents.map((document) => (
                <div
                  key={document.id}
                  className="bg-white group shadow-md rounded-3xl box-border h-52 w-64 overflow-hidden flex flex-col hover:shadow-lg hover:scale-105 hover:rotate-2 hover:border-neutral-900 hover:border-4 hover:bg-neutral-100 transition ease-in-out duration-300 hover:cursor-[url(/public/mouse_click.svg),_pointer]"
                >
                  {document.imageUrl && (
                    <img
                      src={document.imageUrl}
                      className="w-full group-hover:border-b-4 group-hover:border-neutral-900 h-4/6 object-cover rounded-t-lg"
                    />
                  )}
                  {!document.imageUrl && (
                    <span className="group-hover:border-b-4 group-hover:border-neutral-900 bg-neutral-400 w-full h-4/6 bg-opacity-40"></span>
                  )}
                  <span className="relative text-4xl -mt-6 ml-6">
                    {document.emoji ? document.emoji : "📄"}
                  </span>
                  <div className="mx-8">
                    <h2 className=" font-bold text-gray-800 break-words">
                      {document.title}
                    </h2>
                    <span className="text-neutral-500">
                      {timeAgo(document.updatedOn)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DocumentList;
