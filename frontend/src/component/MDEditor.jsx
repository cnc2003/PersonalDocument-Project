import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import "./MDEditor.css";
import MDmenubar from "./MDmenubar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Underline } from "lucide-react";

const MDEditor = ({ content }) => {
  const [editorState, setEditorState] = useState({ content: "" });
  const { boardId } = useParams();
  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit, Underline],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });

  //   const response = async (data) => {
  //     try {
  //       const response = await axios.patch(
  //         `http://localhost:8080/documents/${boardId}`,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //           body: JSON.stringify({
  //             content: editorState,
  //           }),
  //         }
  //       );
  //       if (response.status === 200) {
  //         console.log("Document saved successfully");
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  useEffect(() => {
    console.log(content);
    
    setEditorState(content);
    console.log(editorState);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div>{editor && <MDmenubar editor={editor} />}</div>
      <div className="">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default MDEditor;
