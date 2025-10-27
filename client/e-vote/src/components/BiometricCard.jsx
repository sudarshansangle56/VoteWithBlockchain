import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

const BiometricCard = ({ title, icon, verified }) => (
  <div
    className={`p-4 border rounded-xl flex flex-col items-center justify-center space-y-3 
      ${verified ? "border-green-500 bg-green-50" : "border-gray-300 bg-gray-50"}`}
  >
    <div className="text-blue-600">{icon}</div>
    <h4 className="text-lg font-semibold">{title}</h4>
    <div className="flex items-center space-x-2">
      {verified ? (
        <>
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span className="text-green-600 font-medium">Verified</span>
        </>
      ) : (
        <>
          <XCircle className="h-5 w-5 text-gray-400" />
          <span className="text-gray-500">Pending</span>
        </>
      )}
    </div>
  </div>
);

export default BiometricCard;
