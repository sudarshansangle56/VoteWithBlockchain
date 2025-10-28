import React from 'react';

// A simple presentational component for a single stat card
const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6 hover:scale-105 transition-all duration-300">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} p-3 shadow-lg`}>
        <Icon className="h-full w-full text-white" />
      </div>
    </div>
    <p className="text-gray-600 text-sm font-medium mb-1">{label}</p>
    <p className="text-3xl font-bold text-gray-800">{value}</p>
  </div>
);

export default StatCard;
