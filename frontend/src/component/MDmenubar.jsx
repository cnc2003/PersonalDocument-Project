import React from "react";
import { Editor } from "@tiptap/react";
import { Bold, CrossIcon, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Italic, Strikethrough, Underline } from "lucide-react";

const MDmenubar = ({ editor }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <Bold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <Italic />
      </button>
      {/* <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "is-active" : ""}
      >
        <Underline/>
      </button> */}
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <Strikethrough/>
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        disabled={!editor.can().chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <Heading1/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        disabled={!editor.can().chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <Heading2/>
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        disabled={!editor.can().chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <Heading3/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        disabled={!editor.can().chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <Heading4/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        disabled={!editor.can().chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <Heading5/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        disabled={!editor.can().chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <Heading6/>
      </button>
      
    </div>
  );
};

export default MDmenubar;
