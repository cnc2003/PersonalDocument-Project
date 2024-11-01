import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, createContext, useCallback } from "react";
import axios from "axios";
import NavBar from "../component/NavBar";
import MDEditor from "../component/MDEditor";
import debounce from "lodash.debounce";

export const DocumentContent = createContext(null);

const DocumentDetail = () => {
  const { username, documentId } = useParams();
  const [document, setDocument] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

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
      setIsLoading(false);
    } catch (error) {
      if (error.response.status === 404) {
        navigate(`/${localStorage.getItem("username")}/document`);
      }
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    debouncedUpdateTitle(e.target.value);
  };

  const updateTitle = async (newTitle) => {
    try {
      await axios.patch(
        `http://localhost:8080/documents/${documentId}`,
        { title: newTitle },
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

  const debouncedUpdateTitle = useCallback(debounce(updateTitle, 1000), []);

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
        <section className="h-screen w-full overflow-y-auto">
          {document.imageUrl && (
            <div className="w-full h-64 overflow-hidden">
              <img src={document.imageUrl} className="w-full object-cover" />
            </div>
          )}
          <div
            className={`md:mx-[8rem] mx-[3rem] ${
              document.imageUrl ? "" : "pt-[10rem]"
            }`}
          >
            <div className="text-6xl -mt-9">
              {document.emoji ? document.emoji : "📄"}
            </div>
          </div>
          <div className="flex flex-col md:mx-[8rem] mx-[3rem] gap-4">
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
        </section>
      </div>
    </div>
  );
};

export default DocumentDetail;
