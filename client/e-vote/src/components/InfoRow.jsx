import React from "react";

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center border-b border-gray-100 py-2">
    <span className="text-gray-600 font-medium">{label}</span>
    <span className="text-gray-800">{value}</span>
  </div>
);

export default InfoRow;
