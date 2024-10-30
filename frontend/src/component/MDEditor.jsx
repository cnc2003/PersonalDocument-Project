import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import './MDEditor.css';
const Props = {};

const MDEditor = () => {
    const [editorState, setEditorState] = useState({ content: "" });
  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });
  return (
    <div className="">
      <EditorContent editor={editor} className="focus:border-none"/>
    </div>
  );
};

export default MDEditor;
