import React from "react";
import "./index.css";
import { Box } from "@mui/material";
import { useRef } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const FileUpload = (props) => {
  const uploadRef = useRef(null);
  const onDragEnter = () => uploadRef.current.classList.add("dragover");
  const onDragLeave = () => uploadRef.current.classList.remove("dragover");
  const onDrop = () => uploadRef.current.classList.add("dragover");

  return (
    <>
      <Box
        ref={uploadRef}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className="file-upload-container"
      >
        <p className="title css-1ri3kfm-MuiFormLabel-root-MuiInputLabel-root">
          Business Logo
        </p>
        <div className="custom-drop-label">
          <FileUploadIcon sx={{ fontSize: "50px" }} color="primary" />
          <p>
            <span>Click to upload</span> or <span>drag and drop</span>
            <br />
            {props.logo
              ? `${props.logo.name}`
              : "SVG, JPG, PNG, OR GIF (10MB max)"}
          </p>
        </div>
        <input type="file" onChange={props.onChange} />
      </Box>
    </>
  );
};

export default FileUpload;
