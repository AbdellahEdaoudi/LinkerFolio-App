"use client";
import { Button } from "../../../@/components/ui/button";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import React, { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
function InputLoadMessages() {
  const [emoji, setEmoji] = useState(true);
  const [loading, setLoading] = useState(true);
  return (
    <div>
      <div className={`bg-gray-200 p-2 mt-2 rounded-md`}>
        <div className="flex items-center gap-4 pr-2 ">
          <textarea
            type="text"
            placeholder="Enter your message here..."
            className="flex-1 border-2 bg-white  border-gray-300 rounded-lg p-2  focus:outline-none transition duration-300"
          />
          <Button
            onClick={() => {
              setEmoji(emoji);
            }}
            disabled={loading || messageInput === ""}
            className="bg-indigo-600  text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Send
          </Button>
          <div
            onClick={() => {
              setEmoji(!emoji);
            }}
            className="cursor-pointer text-2xl"
          >
            <BsEmojiSmile />
          </div>
        </div>
      </div>
      <div className={` absolute top-16 right-4 ${emoji ? "hidden" : "block"}`}>
        <Picker data={data} />
      </div>
    </div>
  );
}

export default InputLoadMessages;
