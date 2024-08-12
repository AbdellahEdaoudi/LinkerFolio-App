"use client"
import MDEditor, { selectWord } from "@uiw/react-md-editor";
import { useState } from "react";

export default function page() {
  const [value, setValue] = useState("MDEditor");
  return (
    <div className="container">
        MDEditor
      <MDEditor
        value={value}
        onChange={setValue}
      />
      <MDEditor.Markdown source={value} />
    </div>
  );
}