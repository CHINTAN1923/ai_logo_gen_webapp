"use client";
import React, { useState } from "react";
import FilePreview from "./FilePreview";

interface FileDetails {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

const DropZone = ({ data, dispatch }: { data?: any; dispatch?: any }) => {
  // onDragEnter sets inDropZone to true
  const handleDragEnter = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  // onDragLeave sets inDropZone to false
  const handleDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
  };

  // onDragOver sets inDropZone to true
  const handleDragOver = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    // set dropEffect to copy i.e copy of the source item
    e.dataTransfer.dropEffect = "copy";
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  // onDrop sets inDropZone to false and adds files to fileList
  const handleDrop = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    let files: FileDetails[] = [...e.dataTransfer.files];
    let LocalImageURL = "";
    let reader = new FileReader();

    // Wrap the FileReader in a Promise
    const readAsArrayBufferPromise = (file: File) => {
      return new Promise<ArrayBuffer>((resolve, reject) => {
        reader.onloadend = (e: any) => {
          if (reader.readyState === 2) {
            resolve(e.target.result);
          }
        };
        reader.readAsArrayBuffer(file);
      });
    };

    // Read the file and update LocalImageURL
    const fileArrayBuffer = await readAsArrayBufferPromise(files[0] as any);
    LocalImageURL = URL.createObjectURL(new Blob([fileArrayBuffer]));
    console.log("LocalImageURL: ", LocalImageURL);

    if (files && files.length > 0 && files[0].type.startsWith("image/")) {
      dispatch({
        type: "ADD_FILE_TO_LIST",
        files: files[0],
        LocalImageURL: LocalImageURL,
      });
      dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
    }
  };

  // handle file selection via input element
  const handleFileSelect = async (e: any) => {
    let files: FileDetails[] = [...e.target.files];

    let LocalImageURL = "";
    let reader = new FileReader();

    // Wrap the FileReader in a Promise
    const readAsArrayBufferPromise = (file: File) => {
      return new Promise<ArrayBuffer>((resolve, reject) => {
        reader.onloadend = (e: any) => {
          if (reader.readyState === 2) {
            resolve(e.target.result);
          }
        };
        reader.readAsArrayBuffer(file);
      });
    };

    // Read the file and update LocalImageURL
    const fileArrayBuffer = await readAsArrayBufferPromise(files[0] as any);
    LocalImageURL = URL.createObjectURL(new Blob([fileArrayBuffer]));
    console.log("LocalImageURL: ", LocalImageURL);

    if (files && files.length > 0 && files[0].type.startsWith("image/")) {
      dispatch({
        type: "ADD_FILE_TO_LIST",
        files: files[0],
        LocalImageURL: LocalImageURL,
      });
    }
  };

  const DeleteImage = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    let files: FileDetails[] = [];

    data.fileList = {};
    data.LocalImageURL = "";
    dispatch({ type: "DELETE_FILE", files: files });
  };

  return (
    <>
      <div
        className={"dropzone"}
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragEnter={(e) => handleDragEnter(e)}
        onDragLeave={(e) => handleDragLeave(e)}
      >
        <input
          id="fileSelect"
          key={Math.random()}
          type="file"
          multiple
          className={"files"}
          onChange={(e) => handleFileSelect(e)}
        />
        <label htmlFor="fileSelect">Upload your Image here</label>

        <h3 className={"uploadMessage"}>or drag &amp; drop your Image here</h3>
        {data.fileList.name && (
          <>
            <button
              type="button"
              onClick={(e) => DeleteImage(e)}
              className="btn btn-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"></path>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"></path>
              </svg>
            </button>
            <FilePreview fileData={data} />
          </>
        )}
      </div>
    </>
  );
};

export default DropZone;
