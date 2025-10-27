import React from "react";

const ReviewItem = ({ label, value }) => (
  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
    <span className="text-gray-600 font-medium">{label}</span>
    <span className="text-gray-800 font-semibold">{value}</span>
  </div>
);

export default ReviewItem;
