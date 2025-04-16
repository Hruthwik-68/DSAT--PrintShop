// src/components/CostDisplay.jsx
import React from "react";

const CostDisplay = ({ totalCost }) => (
  <div className="option-group">
    <strong>Total Cost: ₹ {totalCost.toFixed(2)}</strong>
  </div>
);

export default CostDisplay;
