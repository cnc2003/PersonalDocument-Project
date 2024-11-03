import React, { useState, useEffect } from "react";
import "../App.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { timeAgo } from "../util/util";
import NavBar from "../component/NavBar";
import CreateDoc from "../component/CreateDoc";

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const { username } = useParams();
  const navigate = useNavigate();
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
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

  const handleCreateMenu = () => {
    setIsCreateMenuOpen(!isCreateMenuOpen);
  };

  useEffect(() => {
    getDocuments();
  }, []);

  return (
    <div className="sticky">
      <span className="bg- [#F9F6EE] waffle-bg w-screen h-screen fixed -z-10"></span>
      <div className="flex flex-row">
        <aside className="sticky">
          <NavBar />
        </aside>
        <section className="h-screen w-full overflow-y-scroll pb-8 overflow-hidden">
          {isCreateMenuOpen && (
            <div className="fixed inset-0 grid place-content-center ">
              <span className="w-screen h-screen bg-neutral-400 bg-opacity-40 backdrop-blur-sm fixed z-10" onClick={()=> handleCreateMenu()}/>
              <div className="z-20">
                <CreateDoc />
              </div>
            </div>
          )}

          <div className="flex flex-col md:mx-[8rem] mx-[3rem] flex-nowrap">
            <div className="flex flex-col">
              <h1 className="text-4xl font-bold pt-[10rem]">
                Documentary List
              </h1>
              <p className="text-neutral-500 italic">
                Let's write your journal.
              </p>
              <div className="h-12 flex flex-row items-end">
                <button
                  className="btn bg-orange-300 hover:bg-orange-400"
                  onClick={() => handleCreateMenu()}
                >
                  New
                </button>
              </div>
            </div>
            <div className="pt-4 flex flex-row gap-6 flex-wrap">
              {documents.map((document) => (
                <div
                  key={document.id}
                  className="bg-white group shadow-md rounded-3xl box-border h-52 w-64 overflow-hidden flex flex-col hover:shadow-lg hover:scale-105 hover:rotate-2 hover:border-amber-400 hover:border-4 hover:bg-amber-100 transition ease-in-out duration-300 hover:cursor-[url(/public/mouse_click.svg),_pointer]"
                  onClick={() =>
                    navigate(`/${username}/document/${document.id}`)
                  }
                >
                  {document.imageUrl && (
                    <img
                      src={document.imageUrl}
                      className="w-full group-hover:border-b-4 group-hover:border-amber-400 h-4/6 object-cover rounded-t-lg"
                    />
                  )}
                  {!document.imageUrl && (
                    <span className="group-hover:border-b-4 group-hover:border-amber-400 bg-neutral-400 w-full h-4/6 bg-opacity-40"></span>
                  )}
                  <span className="text-4xl -mt-6 ml-6">
                    {document.emoji ? document.emoji : "📄"}
                  </span>
                  <div className="mx-8 ">
                    <h2 className="text-sm group-hover:text-orange-500 font-bold text-gray-800 break-words transition">
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
