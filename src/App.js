import React, { useState } from "react";
import Table from "./components/Table";
import "./App.css";

const App = () => {
  const [data, setData] = useState([
    {
      id: "electronics",
      label: "Electronics",
      value: 1500,
      originalValue: 1500, // original value for variance calculation
      children: [
        { id: "phones", label: "Phones", value: 800, originalValue: 800 },
        { id: "laptops", label: "Laptops", value: 700, originalValue: 700 },
      ],
    },
    {
      id: "furniture",
      label: "Furniture",
      value: 1000,
      originalValue: 1000, // original value for variance calculation
      children: [
        { id: "tables", label: "Tables", value: 300, originalValue: 300 },
        { id: "chairs", label: "Chairs", value: 700, originalValue: 700 },
      ],
    },
  ]);

  const calculateParentTotal = (parentId) => {
    const updatedData = [...data];
    const parent = updatedData.find((row) => row.id === parentId);
    const childrenTotal = parent.children.reduce(
      (sum, child) => sum + child.value,
      0
    );
    parent.value = childrenTotal; // update parent's value based on children's total
    setData(updatedData); // trigger re-render with updated parent value
  };

  const calculateGrandTotal = () => {
    return data.reduce((sum, row) => sum + row.value, 0);
  };

  const handlePercentageChange = (rowId, percentage) => {
    const updatedData = [...data];
    const row = updatedData.find((row) => row.id === rowId);

    if (row) {
      const newValue = row.value + row.value * (percentage / 100);
      row.value = newValue;

      // Recalculate parent totals
      row.children.forEach((child) => calculateParentTotal(child.id));

      // Recalculate parent's variance
      const parent = updatedData.find((parent) => parent.id === row.id);
      if (parent) {
        const parentVariance =
          ((parent.value - parent.originalValue) / parent.originalValue) * 100;
        parent.variance = parentVariance; // Update variance for the parent
      }

      setData(updatedData); // Trigger re-render after percentage change
    }
  };

  const handleValueChange = (rowId, newValue) => {
    const updatedData = [...data];
    const row = updatedData.find((row) => row.id === rowId);

    if (row) {
      const oldValue = row.value;
      row.value = newValue;

      // Recalculate the parent total by redistributing the value proportionally
      const parent = updatedData.find((parent) => parent.id === row.id);
      if (parent) {
        const parentTotal = parent.children.reduce(
          (sum, child) => sum + child.value,
          0
        );
        const totalContribution = parentTotal ? row.value / parentTotal : 1;

        // Adjust child rows based on the proportion
        parent.children.forEach((child) => {
          const childNewValue =
            (child.originalValue / parentTotal) * parent.value;
          child.value = parseFloat(childNewValue.toFixed(2)); // Update child value
        });

        // Recalculate variance for the parent
        const parentVariance =
          ((parent.value - parent.originalValue) / parent.originalValue) * 100;
        parent.variance = parentVariance;
      }
      console.log("parent", parent);
      setData(updatedData); // Trigger re-render after direct value change
    }
  };

  return (
    <div>
      <Table
        data={data}
        handlePercentageChange={handlePercentageChange}
        handleValueChange={handleValueChange}
        calculateGrandTotal={calculateGrandTotal}
      />
    </div>
  );
};

export default App;
