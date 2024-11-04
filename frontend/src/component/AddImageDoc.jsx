import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddImageDoc = ({ document, onClose }) => {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleUpload = async () => {
    if (!imageUrl) return;

    try {
      await axios.patch(
        `http://localhost:8080/documents/${documentId}`,
        { imageUrl },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      onClose();
      navigate(0); // Refresh the page to show the updated image
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white px-12 py-8 rounded-3xl overflow-hidden">
      <div className="flex flex-col gap-2">
        <span className="text-xl font-bold">Change Image</span>
        <input
          type="text"
          placeholder="Enter image URL"
          value={imageUrl}
          onChange={handleUrlChange}
          className="border p-2 rounded"
        />
        <div className="flex flex-row gap-4 mt-4">
          <button className="btn bg-blue-300 hover:bg-blue-400" onClick={handleUpload}>
            Upload
          </button>
          <button className="btn bg-gray-300 hover:bg-gray-400" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddImageDoc;
