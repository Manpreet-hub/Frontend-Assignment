import React from "react";
import Row from "./Row";

const Table = ({
  data,
  handlePercentageChange,
  handleValueChange,
  calculateGrandTotal,
}) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Label</th>
            <th>Value</th>
            <th>Input</th>
            <th>Allocation %</th>
            <th>Allocation Val</th>
            <th>Variance %</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <>
              <Row
                key={row.id}
                rowData={row}
                handlePercentageChange={handlePercentageChange}
                handleValueChange={handleValueChange}
                isChild={false}
                originalValue={row.originalValue}
              />
              {row.children.map((child) => (
                <Row
                  key={child.id}
                  rowData={child}
                  handlePercentageChange={handlePercentageChange}
                  handleValueChange={handleValueChange}
                  isChild={true}
                  originalValue={child.originalValue}
                />
              ))}
            </>
          ))}
          <tr>
            <td>
              <strong>Grand Total</strong>
            </td>
            <td>{calculateGrandTotal()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
