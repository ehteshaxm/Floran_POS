import React, { useState } from "react";

const CurrentPurchase = () => {
  const [bgColor, setBgColor] = useState("light");

  return (
    <div className={`d-flex justify-content-between align-items-center w-100 h-100 p-4 bg-${bgColor}`}>
      <p className="mr-3 fs-4">Current Month Total Purchase</p>
      <div className="d-flex align-items-center">
        <p className="fs-1">10</p>
        <div className="d-flex flex-column justify-content-around ml-3">
         
        </div>
      </div>
    </div>
  );
};

export default CurrentPurchase;
