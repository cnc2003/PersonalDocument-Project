import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import "./MDEditor.css";
import MDmenubar from "./MDmenubar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Underline } from "lucide-react";
import MarkdownIt from "markdown-it";
import TurndownService from "turndown";

const MDEditor = ({ content }) => {
  const [editorState, setEditorState] = useState({ content: "" });
  const { documentId } = useParams();
  const md = new MarkdownIt();
  const turndownService = new TurndownService();

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit, Underline],
    content: md.render(content),
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
      updateContent();
      console.log(turndownService.turndown(editorState));
    },
  });

  const updateContent = async () => {
    try {
      const mdContent = turndownService.turndown(editorState);
      const response = await axios.patch(
        `http://localhost:8080/documents/${documentId}`,
        {
          content: mdContent,
        },
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
    setEditorState(md.render(content));
  }, [content]);

  return (
    <div className="flex flex-col gap-2">
      <div>{editor && <MDmenubar editor={editor} />}</div>
      <div className="editor-container">
        {editor && <EditorContent editor={editor} />}
      </div>
    </div>
  );
};

export default MDEditor;
