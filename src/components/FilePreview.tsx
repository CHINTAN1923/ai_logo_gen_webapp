import React from "react";

const FilePreview = ({ fileData }: { fileData: any }) => {
  return (
    <div className={"fileList"}>
      <div className={"fileContainer"}>
        {/* display the filename and type */}
        <div key={fileData.fileList.name} className={"fileName"}>
          {fileData.fileList.name}
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
