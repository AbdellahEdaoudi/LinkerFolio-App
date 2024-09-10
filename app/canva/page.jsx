"use client";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";



function Page() {
  const [text, setText] = useState("");
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean'] 
    ]
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start pt-4 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4">Text Editor</h1>
        <ReactQuill
          value={text}
          onChange={setText}
          className="h-44"
          theme="snow"
          modules={modules}
        />
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Displayed Text:</h2>
          <div className="w-full p-2 border border-gray-300 rounded-lg">
            <div className="prose text-black marker:text-black" dangerouslySetInnerHTML={{ __html: text }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
