"use client";
import React, { useEffect, useRef, useState } from "react";
import { fetching, readLink, remove } from "./action";
import Link from "next/link";
import { clpl, params } from "./dev";
import package_json from "@/../package.json";
function Root() {
  const [readLinkArr, setReadLinkArr] = useState<object[]>([]);
  const [shortUrl, setShortUrl] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async () => {
    if (!inputRef.current?.value) return;
    setShortUrl(await fetching(inputRef.current?.value));
    inputRef.current.value = "";
  };
  useEffect(() => {
    (async () => {
      // if(localStorage.getItem("caplink")){
      //   setReadLinkArr(JSON.parse(localStorage.getItem("caplink")!))
      //   return
      // }
      await readLink().then((res) => setReadLinkArr(JSON.parse(res)));
    })();
  }, [readLinkArr, shortUrl]);
  return (
    <div className="flex flex-col text-center gap-3 p-5 bg-[#032539] text-[#fbf3f2] rounded-lg max-w-md w-[90%] ">
      <h1 className="text-4xl ">CapLink</h1>
      <p className=" text-gray-300 mb-2">{`Dev by Geeleed v.${package_json.version}`}</p>
      <div className=" flex gap-1 w-full">
        <input
          onKeyDown={async (e) => e.key === "Enter" && (await handleSubmit())}
          className="p-3 bg-[#fbf3f2] rounded-md w-[80%] text-[#fa991c] outline-none"
          ref={inputRef}
          type="url"
          placeholder="Your url that you make short"
        />
        <button
          className={`bg-[#fa991c] p-3 rounded-md hover:bg-[#fa991cdd] w-[20%] min-w-fit`}
          onClick={async () => await handleSubmit()}
        >
          Submit
        </button>
      </div>

      {/* <p>{shortUrl}</p> */}
      <section className=" min-w-full gap-2 max-h-[60vh] overflow-y-scroll text-left ">
        {readLinkArr
          .map((item: any, index) => (
            <Item
              cutFront10={item["cutFront10"] || ""}
              originalUrl={item["originalUrl"] || ""}
              key={index}
              array={readLinkArr}
              setArray={setReadLinkArr}
              _id={item["_id"] || ""}
            />
          ))
          .reverse()}
      </section>
    </div>
  );
}

export default Root;
interface Item {
  cutFront10: string;
  originalUrl: string;
  array: object[];
  setArray: React.Dispatch<React.SetStateAction<object[]>>;
  _id: string;
}
const Item = ({ cutFront10, originalUrl, array, setArray, _id }: Item) => {
  const del = async (id: string) => {
    await remove(id);
    setArray(array.filter((item: any) => item["_id"] !== id));
  };
  return (
    <div className=" w-full p-2 flex justify-between rounded-lg hover:bg-[#1c768f]">
      <div className=" flex flex-col w-[90%]">
        <Link href={originalUrl} target="_blank" className=" break-words">
          {"CapLink: "}
          {/* {(process.env.SERVER_URL || params.SERVER_URL) + cutFront10} */}
          {location.origin + "/" + cutFront10}
        </Link>
        <Link href={originalUrl} target="_blank" className=" break-words">
          {"Original: "}
          {originalUrl}
        </Link>
      </div>

      <button
        onClick={async () => await del(_id)}
        className=" p-2 text-[#fa991c] hover:scale-125"
      >
        X
      </button>
    </div>
  );
};
