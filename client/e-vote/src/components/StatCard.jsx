import React from "react";

const StatCard = ({ icon, label, value, color }) => {
  const colorMap = {
    blue: "text-blue-600 bg-blue-50",
    green: "text-green-600 bg-green-50",
    orange: "text-orange-600 bg-orange-50",
    purple: "text-purple-600 bg-purple-50",
  };

  return (
    <div className={`p-6 bg-white rounded-xl shadow-md border-l-4 ${colorMap[color] || "border-gray-200"}`}>
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-lg ${colorMap[color]}`}>{icon}</div>
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
