import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { timeAgo } from "../util/util";

function Playground() {
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
    <>
      <div
        className={`h-lvh bg-neutral-800  text-neutral-800 shadow-inner transition-width duration-300 w-60`}
      >
        <div className="p-4">
          <div className="user-info mb-4 flex items-center">
            <i className="fas fa-user mr-2"></i>
          </div>
          <div className="document-list mb-4">
            <h3 className="text-sm"></h3>
            <ul className="text-xs">
            </ul>
          </div>
          <div className="sidebar-buttons">
            <button className="w-full text-left text-sm mb-2 flex items-center">
              <i className="fas fa-cog mr-2"></i>
            </button>
            <button className="w-full text-left text-sm flex items-center">
              <i className="fas fa-question-circle mr-2"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="">
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
                <span className="relative text-5xl -mt-8 ml-6">
                  {document.emoji ? document.emoji : "📄"}
                </span>
                <div className="mt-2 mx-8">
                  <h2 className="text-lg font-bold text-gray-800 break-words">
                    {document.title}
                  </h2>
                  <span className="text-neutral-500 font-semibold">
                    {timeAgo(document.updatedOn)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
    </>
  );
}

export default Playground;
