// src/components/ColorOptions.jsx
import React from "react";

const ColorOptions = ({ formData, setFormData, numPages }) => {
  const disableCustom = formData.allPagesColor || formData.zeroPagesColor;

  return (
    <div className="option-group">
      <label>Color Page Numbers:</label>
      <input
        type="checkbox"
        checked={formData.allPagesColor}
        onChange={() =>
          setFormData((prev) => ({
            ...prev,
            allPagesColor: !prev.allPagesColor,
            zeroPagesColor: false,
          }))
        }
      />
      <label>Select All</label>
      <br />
      <input
        type="checkbox"
        checked={formData.zeroPagesColor}
        onChange={() =>
          setFormData((prev) => ({
            ...prev,
            zeroPagesColor: !prev.zeroPagesColor,
            allPagesColor: false,
          }))
        }
      />
      <label>No Pages</label>
      <br />
      <input
        type="number"
        placeholder="Start"
        disabled={disableCustom}
        value={formData.startColorPage}
        min={1}
        max={numPages}
        onChange={(e) =>
          setFormData({ ...formData, startColorPage: parseInt(e.target.value) })
        }
      />
      -
      <input
        type="number"
        placeholder="End"
        disabled={disableCustom}
        value={formData.endColorPage}
        min={1}
        max={numPages}
        onChange={(e) =>
          setFormData({ ...formData, endColorPage: parseInt(e.target.value) })
        }
      />
    </div>
  );
};

export default ColorOptions;
