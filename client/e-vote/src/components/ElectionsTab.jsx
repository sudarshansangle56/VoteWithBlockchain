import React from 'react';
import { PlusCircle, Edit2, Trash2, Search } from 'lucide-react';

const ElectionsTab = ({ elections, searchTerm, setSearchTerm, onAdd, onEdit, onDelete }) => (
  <div className="space-y-6">
    {/* Search and Add Button */}
    <div className="flex items-center justify-between mb-6">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search elections..."
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
        <span>Schedule Election</span>
      </button>
    </div>

    {/* Elections List */}
    <div className="grid gap-6">
      {elections.map(election => (
        <div key={election.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <h3 className="text-xl font-bold text-gray-800">{election.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  election.status === 'Active' ? 'bg-green-100 text-green-700' :
                  election.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {election.status}
                </span>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="font-semibold text-gray-800">{election.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-semibold text-gray-800">{election.startDate} - {election.endDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Votes</p>
                  <p className="font-semibold text-gray-800">{election.totalVotes.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => onEdit(election)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                <Edit2 className="h-5 w-5" />
              </button>
              <button onClick={() => onDelete(election.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
      {elections.length === 0 && (
        <p className="text-center text-gray-500">No elections found matching your search.</p>
      )}
    </div>
  </div>
);

export default ElectionsTab;
