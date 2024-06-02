import { useState } from "react";
import Image from "next/image";
import React from "react";

export default function InputImage() {
  const [image, setImage] = useState<string | null>(null);
  const [focus, setFocus] = useState<boolean>(false);

  const handleImageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      {image ? (
        <>
          <Image
            src={image}
            alt="user_banner"
            className="rounded-xl"
            width={1920}
            height={1080}
          />
          <h1
            className="mb-5 mt-1 hover:cursor-pointer hover:text-fifth underline"
            onClick={() => {
              setImage(null);
              focus === true ? setFocus(false) : "";
            }}
          > change image here </h1>
        </>
      ) : (
        <>
          <h1 className="font-bold mb-3"> Banner </h1>
          <div className={`relative w-full flex items-center h-24 border-solid border-2 rounded-md mb-3 px-5 
            ${focus === true ? "bg-fourth" : "bg-second"}`
          }>
            <h1 className="border p-2 mr-5 text-sm uppercase cursor-pointer rounded-md"> Choose Image </h1>
            <h1> or drag and drop your file here</h1>
            <input
              className="opacity-0 hover:cursor-pointer bg-black absolute top-0 left-0 w-full h-full"
              type="file"
              name="user_banner"
              onChange={(e) => {
                handleImageInput(e);
                // handleChanges(e)
              }}
              onDragEnter={() => setFocus(!focus)}
              onDragLeave={() => setFocus(!focus)}
            />
          </div>
        </>
      )}
    </>
  );
}
