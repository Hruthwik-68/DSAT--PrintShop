// src/components/UploadForm.jsx
import React, { useState } from "react";
import FileUpload from "./FileUpload";
import PageOptions from "./PageOptions";
import ColorOptions from "./ColorOptions";
import BindOptions from "./BindOptions";
import DescriptionBox from "./DescriptionBox";
import CostDisplay from "./CostDisplay";
import { countPdfPages, calculateCost } from "../utils/pdfUtils";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [formData, setFormData] = useState({
    numCopies: 1,
    allPages: false,
    startPage: 1,
    endPage: 1,
    allPagesColor: false,
    zeroPagesColor: false,
    startColorPage: 1,
    endColorPage: 1,
    backToBack: false,
    softBind: false,
    description: "",
    totalCost: 0,
  });

  const handleFileChange = async (selectedFile) => {
    setFile(selectedFile);
    const pageCount = await countPdfPages(selectedFile);
    setNumPages(pageCount);
    setFormData((prev) => ({
      ...prev,
      startPage: 1,
      endPage: pageCount,
      startColorPage: 1,
      endColorPage: pageCount,
    }));
  };

  const handleCostCalculation = () => {
    const cost = calculateCost(formData, numPages);
    setFormData({ ...formData, totalCost: cost });
  };

  return (
    <form className="upload-form" onSubmit={(e) => e.preventDefault()}>
      <FileUpload onFileChange={handleFileChange} />
      <p>
        Number of Pages: <strong>{numPages}</strong>
      </p>

      <PageOptions
        formData={formData}
        setFormData={setFormData}
        numPages={numPages}
      />
      <ColorOptions
        formData={formData}
        setFormData={setFormData}
        numPages={numPages}
      />
      <BindOptions formData={formData} setFormData={setFormData} />
      <DescriptionBox formData={formData} setFormData={setFormData} />

      <CostDisplay totalCost={formData.totalCost} />
      <button type="button" onClick={handleCostCalculation}>
        Calculate Cost
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UploadForm;
