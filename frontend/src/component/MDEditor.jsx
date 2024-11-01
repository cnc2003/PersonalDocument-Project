import axios from "axios";
import { Underline } from "lucide-react";
import MarkdownIt from "markdown-it";
import TurndownService from "turndown";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { DocumentContent } from "../page/DocumentDetail";
import "./MDEditor.css";
import MDmenubar from "./MDmenubar";
import Placeholder from "@tiptap/extension-placeholder";

const MDEditor = () => {
  const { content } = useContext(DocumentContent);
  const [editorState, setEditorState] = useState("");
  const { documentId } = useParams();
  const md = new MarkdownIt();
  const turndownService = new TurndownService();

  const editor = useEditor({
    autofocus: false,
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Write something..." }),
    ],
    content: md.render(content),
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
      updateContent(editor.getHTML());
    },
  });

  const updateContent = async (content) => {
    try {
      const mdContent = turndownService.turndown(content);
      await axios.patch(
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
      // return console.log(mdContent);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (editor) {
      const renderedContent = md.render(content);
      setEditorState(renderedContent);
      editor.commands.setContent(renderedContent);
      console.log(md.render(content));
    }
  }, [content, documentId, editor]);

  return (
    <div className="flex flex-col gap-2 pb-10">
      <div className="sticky top-12 z-20">
        {editor && <MDmenubar editor={editor} />}
      </div>
      <div className="editor-container z-0">
        {editor && <EditorContent editor={editor} />}
      </div>
    </div>
  );
};

export default MDEditor;
