import React from 'react';
import { PlusCircle, Edit2, Trash2, Search } from 'lucide-react';

const PartiesTab = ({ parties, searchTerm, setSearchTerm, onAdd, onEdit, onDelete }) => (
  <div className="space-y-6">
    {/* Search and Add Button */}
    <div className="flex items-center justify-between mb-6">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search parties..."
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
        <span>Add Party</span>
      </button>
    </div>

    {/* Parties Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {parties.map(party => (
        <div key={party.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl hover:scale-105 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-3xl">
              {party.symbol}
            </div>
            <div className="flex space-x-2">
              <button onClick={() => onEdit(party)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                <Edit2 className="h-4 w-4" />
              </button>
              <button onClick={() => onDelete(party.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">{party.name}</h3>
          <p className="text-sm text-gray-600 mb-1">Leader: <span className="font-semibold">{party.leader}</span></p>
          <div className="mt-3 flex items-center space-x-2">
            <div className={`w-4 h-4 rounded-full bg-${party.color}-500 border`}></div>
            <span className="text-xs text-gray-600 capitalize">{party.color}</span>
          </div>
        </div>
      ))}
       {parties.length === 0 && (
        <p className="text-center text-gray-500 md:col-span-2 lg:col-span-3">No parties found matching your search.</p>
      )}
    </div>
  </div>
);

export default PartiesTab;
