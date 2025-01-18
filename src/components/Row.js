import React, { useState } from "react";

const Row = ({
  rowData,
  handlePercentageChange,
  handleValueChange,
  isChild,
  originalValue,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [variance, setVariance] = useState(0);

  const handleAllocationPercentage = () => {
    const percentage = parseFloat(inputValue);
    if (!isNaN(percentage) && percentage > 0) {
      const newVariance =
        ((rowData.value - originalValue) / originalValue) * 100;
      console.log("newVariance", newVariance);

      setVariance(newVariance);
    }
  };

  const handleAllocationValue = () => {
    const newValue = parseFloat(inputValue);
    if (!isNaN(newValue)) {
      handleValueChange(rowData.id, newValue);
      const newVariance = ((newValue - originalValue) / originalValue) * 100;
      setVariance(newVariance);
    }
  };
  console.log("variance", variance);
  return (
    <tr>
      <td>{isChild ? `-- ${rowData.label}` : rowData.label}</td>
      <td>{rowData.value.toFixed(2)}</td>
      <td>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </td>
      <td>
        <button onClick={handleAllocationPercentage}>Allocation %</button>
      </td>
      <td>
        <button onClick={handleAllocationValue}>Allocation Val</button>
      </td>
      <td>{variance.toFixed(2)}%</td>
    </tr>
  );
};

export default Row;
