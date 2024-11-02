import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, createContext, useCallback } from "react";
import axios from "axios";
import NavBar from "../component/NavBar";
import MDEditor from "../component/MDEditor";
import DeleteDoc from "../component/DeleteDoc";
import { TrashIcon } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

export const DocumentContent = createContext(null);

const DocumentDetail = () => {
  const { username, documentId } = useParams();
  const [document, setDocument] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [emoji, setEmoji] = useState("📄");
  const navigate = useNavigate();
  const [isDeleteMenuOpen, setIsDeleteMenuOpen] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDeleteMenu = () => {
    setIsDeleteMenuOpen(!isDeleteMenuOpen);
  };

  const handleEmojiChange = async (event) => {
    const newEmoji = event.emoji;
    await updateDocument({ emoji: newEmoji });
    setEmoji(newEmoji);
    setIsEmojiPickerOpen(false);
  };

  const fetchDocument = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/documents/${documentId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      setDocument(response.data);
      setTitle(response.data.title);
      setEmoji(response.data.emoji || "📄");
      setIsLoading(false);
    } catch (error) {
      if (error.response.status === 404) {
        navigate(`/${localStorage.getItem("username")}/document`);
      }
    }
  };

  const updateDocument = async (obj) => {
    try {
      await axios.patch(
        `http://localhost:8080/documents/${documentId}`,
        obj,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDocument();
    window.scrollTo(0, 0); // Scroll to the top when the component mounts or documentId changes
  }, [documentId]);

  return (
    <div className="">
      <span className="bg-[#F9F6EE] w-screen h-screen fixed -z-10"></span>
      <div className="flex flex-row">
        <aside className="">
          <NavBar />
        </aside>
        <section className="h-screen w-full overflow-y-auto flex flex-col">
          <nav className="min-h-11 sticky bg-white top-0 flex gap-2 justify-end items-center w-full px-2 z-10">
            <button
              onClick={() => setIsDeleteMenuOpen(!isDeleteMenuOpen)}
              className="btn px-[4px] bg-neutral-200 hover:bg-neutral-300"
            >
              <TrashIcon className="w-6 h-6" />
            </button>
          </nav>
          <div className="z-0">
            {document.imageUrl && (
              <div className="w-full h-64 overflow-hidden ">
                <img src={document.imageUrl} className="w-full object-cover" />
              </div>
            )}
            <div
              className={`md:mx-[14rem] mx-[3rem] ${
                document.imageUrl ? "" : "pt-[10rem]"
              }`}
            >
              <div
                className="text-6xl -mt-9 cursor-pointer"
                onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
              >
                {emoji}
              </div>
              {isEmojiPickerOpen && (
                <div className="absolute z-30">
                  <EmojiPicker onEmojiClick={handleEmojiChange} />
                </div>
              )}
            </div>
            <div className="flex flex-col md:mx-[14rem] mx-[3rem] gap-4">
              <div className="">
                <textarea
                  value={title}
                  onChange={handleTitleChange}
                  className="w-full text-4xl font-bold pt-[2rem] bg-transparent border-none focus:outline-none resize-none overflow-hidden"
                  rows="1"
                  style={{ whiteSpace: "pre-wrap" }}
                />
              </div>
              {!isLoading && (
                <div className="">
                  <DocumentContent.Provider value={document}>
                    <MDEditor />
                  </DocumentContent.Provider>
                </div>
              )}
            </div>
          </div>
        </section>
        {isDeleteMenuOpen && (
          <section>
            <div className="fixed inset-0 grid place-content-center ">
              <span
                className="w-screen h-screen bg-neutral-400 bg-opacity-40 backdrop-blur-sm fixed z-10"
                onClick={() => handleDeleteMenu()}
              />
              <div className="z-20">
                <DeleteDoc document={document} />
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default DocumentDetail;
