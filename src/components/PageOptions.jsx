// src/components/PageOptions.jsx
import React from "react";

const PageOptions = ({ formData, setFormData, numPages }) => {
  return (
    <div className="option-group">
      <label>Pages to Print:</label>
      <input
        type="checkbox"
        checked={formData.allPages}
        onChange={() =>
          setFormData((prev) => ({
            ...prev,
            allPages: !prev.allPages,
          }))
        }
      />
      <label>Select All</label>
      <br />
      <input
        type="number"
        placeholder="Start Page"
        disabled={formData.allPages}
        value={formData.startPage}
        min={1}
        max={numPages}
        onChange={(e) =>
          setFormData({ ...formData, startPage: parseInt(e.target.value) })
        }
      />
      -
      <input
        type="number"
        placeholder="End Page"
        disabled={formData.allPages}
        value={formData.endPage}
        min={1}
        max={numPages}
        onChange={(e) =>
          setFormData({ ...formData, endPage: parseInt(e.target.value) })
        }
      />
    </div>
  );
};

export default PageOptions;
