import React from "react";

const StepIndicator = ({ number, label, active, completed }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className={`h-10 w-10 flex items-center justify-center rounded-full border-2 
          ${completed ? "bg-green-500 border-green-500 text-white" :
            active ? "bg-blue-600 border-blue-600 text-white" :
            "border-gray-300 text-gray-400"}`}
      >
        {completed ? "✓" : number}
      </div>
      <span
        className={`mt-2 text-sm font-medium ${
          active || completed ? "text-blue-600" : "text-gray-400"
        }`}
      >
        {label}
      </span>
    </div>
  );
};

export default StepIndicator;
