// src/components/DescriptionBox.jsx
import React from "react";

const DescriptionBox = ({ formData, setFormData }) => (
  <div className="option-group">
    <label>Description (Max 500 words):</label>
    <textarea
      maxLength="500"
      value={formData.description}
      onChange={(e) =>
        setFormData({ ...formData, description: e.target.value })
      }
    ></textarea>
  </div>
);

export default DescriptionBox;
