import React from 'react';
import { PlusCircle, Edit2, Trash2, Search } from 'lucide-react';

// Helper for dynamic Tailwind classes
const statusClasses = {
  Approved: 'bg-green-100 text-green-700',
  Pending: 'bg-yellow-100 text-yellow-700',
  Rejected: 'bg-red-100 text-red-700',
};

const CandidatesTab = ({ candidates, searchTerm, setSearchTerm, onAdd, onEdit, onDelete }) => (
  <div className="space-y-6">
    {/* Search and Add Button */}
    <div className="flex items-center justify-between mb-6">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search candidates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>
      <button
        onClick={onAdd}
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
      >
        <PlusCircle className="h-5 w-5" />
        <span>Add Candidate</span>
      </button>
    </div>

    {/* Candidates Table */}
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-blue-50 to-purple-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Party</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Constituency</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Votes</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map(candidate => (
              <tr key={candidate.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4">
                  <p className="font-semibold text-gray-800">{candidate.name}</p>
                </td>
                <td className="px-6 py-4 text-gray-600">{candidate.party}</td>
                <td className="px-6 py-4 text-gray-600">{candidate.constituency}</td>
                <td className="px-6 py-4">
                  <span className="font-bold text-blue-600">{candidate.votes.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    statusClasses[candidate.status] || 'bg-gray-100 text-gray-700'
                  }`}>
                    {candidate.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button onClick={() => onEdit(candidate)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button onClick={() => onDelete(candidate.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {candidates.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-6">
                  No candidates found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default CandidatesTab;
