// src/components/BindOptions.jsx
import React from "react";

const BindOptions = ({ formData, setFormData }) => (
  <div className="option-group">
    <label>
      <input
        type="checkbox"
        checked={formData.backToBack}
        onChange={() =>
          setFormData({ ...formData, backToBack: !formData.backToBack })
        }
      />
      Back to Back?
    </label>
    <br />
    <label>
      <input
        type="checkbox"
        checked={formData.softBind}
        onChange={() =>
          setFormData({ ...formData, softBind: !formData.softBind })
        }
      />
      Soft Bind?
    </label>
  </div>
);

export default BindOptions;
