import React from 'react';
import { Vote, TrendingUp } from 'lucide-react';
import StatCard from './StatCard';

const DashboardTab = ({ stats, elections, candidates }) => {
  // Sort candidates once for the "Leading Candidates" section
  const leadingCandidates = [...candidates]
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 5);

  const activeElections = elections.filter(e => e.status === 'Active');

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatCard
            key={idx}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Active Elections */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
          <Vote className="h-6 w-6 text-blue-600" />
          <span>Active Elections</span>
        </h3>
        <div className="space-y-4">
          {activeElections.length > 0 ? (
            activeElections.map(election => (
              <div key={election.id} className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-800">{election.name}</h4>
                    <p className="text-sm text-gray-600">{election.startDate} to {election.endDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{election.totalVotes.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">Total Votes</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No active elections at the moment.</p>
          )}
        </div>
      </div>

      {/* Top Candidates */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
          <TrendingUp className="h-6 w-6 text-green-600" />
          <span>Leading Candidates</span>
        </h3>
        <div className="space-y-3">
          {leadingCandidates.length > 0 ? (
            leadingCandidates.map((candidate, idx) => (
              <div key={candidate.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{candidate.name}</p>
                    <p className="text-xs text-gray-600">{candidate.constituency}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">{candidate.votes.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">votes</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No candidate data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
