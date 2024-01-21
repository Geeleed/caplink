"use client";
import React, { useRef, useState } from "react";
import { fetching } from "./action";
function Root() {
  const [shortUrl, setShortUrl] = useState<string>("");
  const inputRef = useRef<any>(null);
  const handleSubmit = async () => {
    setShortUrl(await fetching(inputRef.current?.value));
  };
  return (
    <div className="flex flex-col text-center gap-3 p-5">
      <h1 className="text-4xl mb-2">CapLink Application</h1>
      <input
        className="p-3 border border-gray-200 rounded-md"
        ref={inputRef}
        type="url"
        placeholder="Your url"
      />
      <button
        className=" bg-red-500 p-3 rounded-md"
        onClick={async () => await handleSubmit()}
      >
        Submit
      </button>
      <p>{shortUrl}</p>
    </div>
  );
}

export default Root;
