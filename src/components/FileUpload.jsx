// src/components/FileUpload.jsx
import React from "react";

const FileUpload = ({ onFileChange }) => {
  return (
    <div className="option-group">
      <label>Choose Your File:</label>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => onFileChange(e.target.files[0])}
        required
      />
    </div>
  );
};

export default FileUpload;
