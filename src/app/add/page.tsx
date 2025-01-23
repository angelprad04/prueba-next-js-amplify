"use client";
import React, { useState } from "react";
import { createPost } from "@/app/_actions/actions";

export default function AddPost() {
  /*
  const [inputValue, setInput] = useState({
    input1: "",
    input2: "",
    input3: "",
  });
*/
  /*
  const onChange = (
    e: { target: { value: React.SetStateAction<string> } },
    id: number
  ) => {
    setInput((prevInputValue) => ({
      ...prevInputValue,
      [`input${id}`]: e.target.value.toString(),
    }));
  };
*/
  return (
    <div>
      <form
        action={createPost}
        className="p-4 flex flex-col items-center gap-4"
      >
        {/*   {inputValue.input1.trim() !== "" && (
          <div className="bg-[#005c4b] text-[#e9edef] max-w-xs w-auto border border-gray-200  block p-2 rounded-xl rounded-tl-none square-lg animate-[bounce_1s_ease-in-out_once] transform -scale-x-100 overflow-hidden">
            <div className="whitespace-normal transform -scale-x-100 break-words">
              {inputValue.input1}
            </div>
          </div>
        )}

        {inputValue.input2.trim() !== "" && (
          <div className="border border-gray-200 text-gray-900 block p-2 rounded p-2 square-lg animate-bounce 1">
            {inputValue.input2}
          </div>
        )}
        {inputValue.input3.trim() !== "" && (
          <div className="border border-gray-200 text-gray-900 block p-2 rounded p-2 square-lg animate-bounce 1">
            {inputValue.input3}
          </div>
        )} */}

        <input
          type="text"
          name="title1"
          id="title1"
          placeholder="Title"
          className="border border-gray-200 text-gray-900 block p-2 rounded-lg"
          //onChange={(e) => onChange(e, 1)}
        />
        {/* <input
          type="text"
          name="title1"
          id="title1"
          placeholder="Title"
          className="border border-gray-200 text-gray-900 block p-2 rounded-lg"
          onChange={(e) => onChange(e, 2)}
        />
        <input
          type="text"
          name="title1"
          id="title1"
          placeholder="Title"
          className="border border-gray-200 text-gray-900 block p-2 rounded-lg"
          onChange={(e) => onChange(e, 3)}
        /> */}
        <button type="submit" className="text-white bg-teal-600 rounded p-4">
          Submit
        </button>
      </form>
    </div>
  );
}
