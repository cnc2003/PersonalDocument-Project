import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { presetGallery } from "../assets/gallery";
import "../page/Setting.css";
const BASE_URL = import.meta.env.VITE_API_URL;

const getRandomImage = () => {
  const categories = Object.keys(presetGallery);
  const randomCategory =
    categories[Math.floor(Math.random() * categories.length)];
  const randomIndex = Math.floor(
    Math.random() * presetGallery[randomCategory].length
  );
  return presetGallery[randomCategory][randomIndex];
};

const AddImageDoc = ({ document, onClose, onUpdate }) => {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [mode, setMode] = useState("gallery"); // "url", "gallery", "random"

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    validateImageUrl(url);
  };

  const validateImageUrl = (url) => {
    const imageUrlPattern = /\.(jpeg|jpg|gif|png)(\?.*)?$/i;
    if (!imageUrlPattern.test(url)) {
      setIsValidUrl(false);
      return;
    }

    const img = new Image();
    img.onload = () => setIsValidUrl(true);
    img.onerror = () => setIsValidUrl(false);
    img.src = url;
  };

  const handleUpload = async () => {
    if (!imageUrl || !isValidUrl) return;
    if (mode == "random") {
      setImageUrl(getRandomImage());
      console.log(imageUrl);
    }
    try {
      const response = await axios.patch(
        `${BASE_URL}/documents/${documentId}`,
        { imageUrl },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      }
    );
    onUpdate(response.data.imageUrl);
    onClose();
  } catch (error) {
    console.error(error);
  }
};

  const handleModeChange = (newMode) => {
    setMode(newMode);
    if (newMode === "random") {
      const randomImage = getRandomImage();
      setImageUrl(randomImage);
      validateImageUrl(randomImage);
    } else {
      setImageUrl("");
      setIsValidUrl(true);
    }
  };

  return (
    <div className="bg-white px-3 py-3  rounded-lg overflow-hidden w-[320px] sm:w-[460px]">
      <div className="flex flex-col gap-2">
        <div className="flex border-b">
        <div
            className={`${
              mode === "gallery" ? "text-sky-400 border-b-2 border-sky-400" : ""
            }`}
          >
            <button
              className="font-medium px-2 mb-1 text-neutral-700 hover:bg-neutral-200 rounded-md"
              onClick={() => handleModeChange("gallery")}
            >
              Gallery
            </button>
          </div>
          <div
            className={`${
              mode === "url" ? "text-sky-400 border-b-2 border-sky-400" : ""
            }`}
          >
            <button
              className="font-medium px-2 mb-1 text-neutral-700 hover:bg-neutral-200 rounded-md"
              onClick={() => handleModeChange("url")}
            >
              Link
            </button>
          </div>
          
          {/* <div
            className={`${
              mode === "random" ? "text-sky-400 border-b-2 border-sky-400" : ""
            }`}
          >
            <button
              className="font-medium px-2 mb-1 text-neutral-700 hover:bg-neutral-200 rounded-md"
              onClick={() => handleModeChange("rendom")}
            >
              Random
            </button>
          </div> */}
        </div>
        {mode === "url" && (
          <input
            type="text"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={handleUrlChange}
            className={`w-full rounded-md border border-neutral-400 focus:outline-2 focus:outline-blue-400 pl-1 py-1  ${
              isValidUrl ? "" : "border-red-500"
            }`}
          />
        )}
        {mode === "gallery" && (
          <div className="flex flex-col gap-3 overflow-y-auto max-h-[420px]">
            {Object.keys(presetGallery).map((category) => (
              <div key={category}>
                <h3 className="text-sm cursor-default text-neutral-800 font-semibold pb-2 ">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {presetGallery[category].map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Preset ${index}`}
                      className={`w-32 h-16 cursor-pointer hover:border-2 object-cover rounded-md ${
                        imageUrl === url ? "border-2 border-blue-500" : "border"
                      }`}
                      onClick={() => {
                        setImageUrl(url);
                        validateImageUrl(url);
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {!isValidUrl && <span className="text-red-500">Invalid image URL</span>}
        <div className="flex flex-row gap-4">
          <button
            className="setbtn text-neutral-800 disabled:bg-red-300"
            onClick={handleUpload}
            disabled={mode != "random" && !isValidUrl}
          >
            {mode == "url" ? "Update" : "Save"}
          </button>
          {/* <button className="setbtn text-neutral-800" onClick={onClose}>
            Cancel
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default AddImageDoc;
