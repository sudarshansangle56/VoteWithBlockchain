import React from "react";

const DashboardCard = ({ icon, title, value, color }) => {
  const colorMap = {
    blue: "text-blue-600 bg-blue-50",
    green: "text-green-600 bg-green-50",
    purple: "text-purple-600 bg-purple-50",
    red: "text-red-600 bg-red-50",
  };

  return (
    <div className={`p-6 rounded-xl shadow-md bg-white border-l-4 ${colorMap[color] || "border-gray-200"}`}>
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-lg ${colorMap[color]}`}>{icon}</div>
        <div>
          <h4 className="text-gray-600 text-sm font-medium">{title}</h4>
          <p className="text-lg font-semibold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
