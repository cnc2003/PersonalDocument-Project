import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";
const CreateDoc = () => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/documents`,
        { title, privacy: "PRIVATE" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        navigate(`/${localStorage.getItem('username')}/document/${response.data.id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white px-12 py-8 rounded-3xl overflow-hidden">
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          {/* <span className="text-4xl">📄</span> */}
          <span className="text-xl font-bold">New Document</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col pl-[8px]">
            <label htmlFor="title" className="font-semibold">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="New Document"
              className="border-b-2 border-yellow-500 focus:outline-none"
              required
            />
          </div>
          <button type="submit" className="btn mt-4">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDoc;
