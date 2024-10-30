import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../component/NavBar";
import axios from "axios";
import MDEditor from "../component/MDEditor";

const DocumentDetail = () => {
  const { username, documentId } = useParams();
  const [document, setDocument] = useState({});
  const fetchDocument = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/documents/${documentId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT token
          },
          withCredentials: true, // Ensure credentials are sent
        }
      );
      setDocument(response.data);
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        window.location.href = "/signin";
      }
    }
  };

  useEffect(() => {
    fetchDocument();
  }, []);

  return (
    <div className="">
      {/* <FloatingEmojis /> */}
      <span className="bg-[#F9F6EE] w-screen h-screen fixed -z-10"></span>
      <div className="flex flex-row">
        <aside className="w-64 fixed">
          <NavBar />
        </aside>
        <section className="ml-64">
          <div className="flex flex-col md:mx-[8rem] mx-[3rem] gap-4">
            <div className="flex flex-col">
              <h1 className="text-4xl font-bold pt-[10rem]">
                {document.title}
              </h1>
            </div>
            <div className="">
                <MDEditor />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DocumentDetail;
