import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const presetGallery = [
  "https://img.freepik.com/free-vector/flat-blue-abstract-background_23-2149325393.jpg?t=st=1730711586~exp=1730715186~hmac=8ea7e2ed10395b6130ff04c37973371207659113fd7f3d98bbd1fd1feb2adb9a&w=1380",
  "https://img.freepik.com/free-vector/gradient-minimalist-background_23-2149974328.jpg?t=st=1730711602~exp=1730715202~hmac=dd135e50a2e89f81423dde1c9c9402486722fbe6600dc455099f0e17f00d78fa&w=1380",
  "https://img.freepik.com/free-vector/flat-design-abstract-background_23-2149116112.jpg?t=st=1730711624~exp=1730715224~hmac=ac57990198cfe64728eee929bb73b2885cf9dfef0c6b910f66a280b32c9e54dc&w=1380",
  "https://img.freepik.com/free-vector/abstract-pink-background_23-2149116114.jpg?t=st=1730711688~exp=1730715288~hmac=a7f12556bde8e6a1b2505ae789f08424d2b953d1d15ef3ed5b7d6e7b44cc7425&w=1380",
  "https://img.freepik.com/free-vector/green-abstract-background_23-2149116116.jpg?t=st=1730711710~exp=1730715310~hmac=ebdb511ec3f0c25898b8ecdbd8f244fffe9c5fdbef8a621c85a69ec42bc8e27d&w=1380",
  "https://img.freepik.com/free-vector/red-abstract-background_23-2149116120.jpg?t=st=1730711745~exp=1730715345~hmac=a04ab59e02028e8b943c1aa0ae9cf4a0057f981b2344d13d63e785db09f3db4f&w=1380",
  "https://img.freepik.com/free-vector/yellow-abstract-background_23-2149116121.jpg?t=st=1730711779~exp=1730715379~hmac=3e24d8c8f046b7ae9ae42f71343e07a6c3e7ff7ec87cae1a37c651051f20e6e6&w=1380",
  "https://img.freepik.com/free-vector/abstract-circular-background_23-2149116124.jpg?t=st=1730711808~exp=1730715408~hmac=fc4852d06e24e4e4ef4aeab5fdf8c2f5364b1fd167fc5e1e8f3c362db85f56c5&w=1380",
  "https://img.freepik.com/free-vector/blue-gradient-background_23-2149116125.jpg?t=st=1730711834~exp=1730715434~hmac=1d0e3f53765d2b6a78f529e43edaa75fbe2b300a06b200eae0a86836c62fd3c1&w=1380",
  "https://img.freepik.com/free-vector/abstract-linear-background_23-2149116126.jpg?t=st=1730711860~exp=1730715460~hmac=c73d47b337fd9ed2ef4b826b9bc8b58377e743f9e1f59bc35a6784931ef6311d&w=1380"
];



const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * presetGallery.length);
  return presetGallery[randomIndex];
};

const AddImageDoc = ({ document, onClose }) => {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [mode, setMode] = useState("url"); // "url", "gallery", "random"

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

    try {
      await axios.patch(
        `http://localhost:8080/api/documents/${documentId}`,
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

  const handleModeChange = (newMode) => {
    setMode(newMode);
    if (newMode === "random") {
      const randomImage = getRandomImage();
      setImageUrl(randomImage);
      validateImageUrl(randomImage);
    } else if (newMode === "gallery") {
      setImageUrl(presetGallery[0]);
      validateImageUrl(presetGallery[0]);
    } else {
      setImageUrl("");
      setIsValidUrl(true);
    }
  };

  return (
    <div className="bg-white px-12 py-8 rounded-3xl overflow-hidden">
      <div className="flex flex-col gap-2">
        <span className="text-xl font-bold">Change Image</span>
        <div className="flex gap-2">
          <button className={`btn ${mode === "url" ? "bg-blue-300" : "bg-gray-300"}`} onClick={() => handleModeChange("url")}>
            URL
          </button>
          <button className={`btn ${mode === "gallery" ? "bg-blue-300" : "bg-gray-300"}`} onClick={() => handleModeChange("gallery")}>
            Gallery
          </button>
          <button className={`btn ${mode === "random" ? "bg-blue-300" : "bg-gray-300"}`} onClick={() => handleModeChange("random")}>
            Random
          </button>
        </div>
        {mode === "url" && (
          <input
            type="text"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={handleUrlChange}
            className={`border p-2 rounded ${isValidUrl ? '' : 'border-red-500'}`}
          />
        )}
        {mode === "gallery" && (
          <div className="flex flex-wrap gap-2">
            {presetGallery.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Preset ${index}`}
                className={`w-24 h-24 cursor-pointer ${imageUrl === url ? "border-2 border-blue-500" : "border"}`}
                onClick={() => {
                  setImageUrl(url);
                  validateImageUrl(url);
                }}
              />
            ))}
          </div>
        )}
        {!isValidUrl && <span className="text-red-500">Invalid image URL</span>}
        <div className="flex flex-row gap-4 mt-4">
          <button className="btn bg-blue-300 hover:bg-blue-400" onClick={handleUpload} disabled={!isValidUrl}>
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
