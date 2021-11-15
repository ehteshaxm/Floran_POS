import React from "react";

const Table = ({ text }) => {
  return (
    <div className="w-100 mr-3 p-2">
      <p className="fs-2 fw-bold">{text}</p>
      <div className="table-responsive">
        <table
          className="table table-bordered table-hover"
          data-page-length="100"
        >
          <thead className="table-light">
            <tr>
              <th>Sr.No</th>
              <th>Product Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody className="table-light">
            <tr>
              <td>1</td>
              <td>Rice</td>
              <td>43</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Dal</td>
              <td>2</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Cooking Oil</td>
              <td>1</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Cheif hats</td>
              <td>41</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Serving tray</td>
              <td>4</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
