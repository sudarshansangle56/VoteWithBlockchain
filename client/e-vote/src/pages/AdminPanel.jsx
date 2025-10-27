import React, { useState } from 'react';
import { Users, Vote, Calendar, Bell, PlusCircle, Edit2, Trash2, Search, BarChart3, Shield, TrendingUp, Eye, Send, X, CheckCircle, Award, AlertCircle } from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(null);
  const [elections, setElections] = useState([
    { id: 1, name: 'Lok Sabha Election 2024', type: 'National', status: 'Active', startDate: '2024-04-01', endDate: '2024-05-15', totalVotes: 45678 },
    { id: 2, name: 'Maharashtra Vidhan Sabha 2024', type: 'State', status: 'Scheduled', startDate: '2024-06-10', endDate: '2024-06-25', totalVotes: 0 }
  ]);
  const [parties, setParties] = useState([
    { id: 1, name: 'National Unity Party', symbol: '🦁', leader: 'Amit Sharma', color: 'blue' },
    { id: 2, name: "People's Progress Front", symbol: '🌟', leader: 'Priya Deshmukh', color: 'green' },
    { id: 3, name: 'Green Future Party', symbol: '🌱', leader: 'Rahul Patil', color: 'emerald' }
  ]);
  const [candidates, setCandidates] = useState([
    { id: 1, name: 'Amit Sharma', party: 'National Unity Party', constituency: 'Mumbai North', votes: 15234, status: 'Approved' },
    { id: 2, name: 'Priya Deshmukh', party: "People's Progress Front", constituency: 'Pune Central', votes: 12456, status: 'Approved' },
    { id: 3, name: 'Rahul Patil', party: 'Green Future Party', constituency: 'Nashik East', votes: 9876, status: 'Pending' }
  ]);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Election Started', message: 'Lok Sabha Election 2024 has begun', date: '2024-04-01', sent: true },
    { id: 2, title: 'Voting Reminder', message: 'Only 3 days left to cast your vote', date: '2024-05-12', sent: false }
  ]);

  const [formData, setFormData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    { label: 'Total Elections', value: elections.length, icon: Vote, color: 'from-blue-500 to-cyan-500' },
    { label: 'Total Parties', value: parties.length, icon: Award, color: 'from-purple-500 to-pink-500' },
    { label: 'Total Candidates', value: candidates.length, icon: Users, color: 'from-orange-500 to-amber-500' },
    { label: 'Total Votes', value: elections.reduce((sum, e) => sum + e.totalVotes, 0).toLocaleString(), icon: TrendingUp, color: 'from-green-500 to-emerald-500' }
  ];

  const handleAdd = (type) => {
    setShowModal(type);
    setFormData({});
  };

  const handleEdit = (type, item) => {
    setShowModal(`edit-${type}`);
    setFormData(item);
  };

  const handleDelete = (type, id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      if (type === 'election') setElections(elections.filter(e => e.id !== id));
      else if (type === 'party') setParties(parties.filter(p => p.id !== id));
      else if (type === 'candidate') setCandidates(candidates.filter(c => c.id !== id));
      else if (type === 'notification') setNotifications(notifications.filter(n => n.id !== id));
    }
  };

  const handleSubmit = (type) => {
    const newId = Math.max(...(type === 'election' ? elections : type === 'party' ? parties : type === 'candidate' ? candidates : notifications).map(i => i.id), 0) + 1;
    const newItem = { ...formData, id: newId };
    
    if (type === 'election') setElections([...elections, { ...newItem, totalVotes: 0, status: 'Scheduled' }]);
    else if (type === 'party') setParties([...parties, newItem]);
    else if (type === 'candidate') setCandidates([...candidates, { ...newItem, votes: 0, status: 'Pending' }]);
    else if (type === 'notification') setNotifications([...notifications, { ...newItem, sent: false, date: new Date().toISOString().split('T')[0] }]);
    
    setShowModal(null);
    setFormData({});
  };

  const handleUpdate = (type) => {
    if (type === 'election') setElections(elections.map(e => e.id === formData.id ? formData : e));
    else if (type === 'party') setParties(parties.map(p => p.id === formData.id ? formData : p));
    else if (type === 'candidate') setCandidates(candidates.map(c => c.id === formData.id ? formData : c));
    
    setShowModal(null);
    setFormData({});
  };

  const sendNotification = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, sent: true } : n));
    alert('Notification sent successfully!');
  };

  const Modal = ({ title, children }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
          <button onClick={() => setShowModal(null)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
      </div>

      {/* Header */}
      {/* <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 p-2.5 shadow-lg">
              <Shield className="h-full w-full text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Admin Panel</h1>
              <p className="text-xs text-gray-600">Election Management System</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="h-6 w-6 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">3</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">A</div>
          </div>
        </div>
      </div> */}

      <div className="max-w-7xl mx-auto px-6 py-8 relative">
        {/* Navigation Tabs */}
        <div className="mb-8 bg-white/60 backdrop-blur-sm rounded-2xl p-2 border border-gray-200 shadow-sm overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'elections', label: 'Elections', icon: Vote },
              { id: 'parties', label: 'Parties', icon: Award },
              { id: 'candidates', label: 'Candidates', icon: Users },
              { id: 'notifications', label: 'Notifications', icon: Bell }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-transparent text-gray-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6 hover:scale-105 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} p-3 shadow-lg`}>
                      <stat.icon className="h-full w-full text-white" />
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Active Elections */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <Vote className="h-6 w-6 text-blue-600" />
                <span>Active Elections</span>
              </h3>
              <div className="space-y-4">
                {elections.filter(e => e.status === 'Active').map(election => (
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
                ))}
              </div>
            </div>

            {/* Top Candidates */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <TrendingUp className="h-6 w-6 text-green-600" />
                <span>Leading Candidates</span>
              </h3>
              <div className="space-y-3">
                {candidates.sort((a, b) => b.votes - a.votes).slice(0, 5).map((candidate, idx) => (
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
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Elections Tab */}
        {activeTab === 'elections' && (
          <div className="space-y-6">
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
                onClick={() => handleAdd('election')}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
              >
                <PlusCircle className="h-5 w-5" />
                <span>Schedule Election</span>
              </button>
            </div>

            <div className="grid gap-6">
              {elections.filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase())).map(election => (
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
                      <button onClick={() => handleEdit('election', election)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button onClick={() => handleDelete('election', election.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Parties Tab */}
        {activeTab === 'parties' && (
          <div className="space-y-6">
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
                onClick={() => handleAdd('party')}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
              >
                <PlusCircle className="h-5 w-5" />
                <span>Add Party</span>
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {parties.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(party => (
                <div key={party.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl hover:scale-105 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-3xl">
                      {party.symbol}
                    </div>
                    <div className="flex space-x-2">
                      <button onClick={() => handleEdit('party', party)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete('party', party.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{party.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">Leader: <span className="font-semibold">{party.leader}</span></p>
                  <div className="mt-3 flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full bg-${party.color}-500`}></div>
                    <span className="text-xs text-gray-600">Party Color</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Candidates Tab */}
        {activeTab === 'candidates' && (
          <div className="space-y-6">
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
                onClick={() => handleAdd('candidate')}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
              >
                <PlusCircle className="h-5 w-5" />
                <span>Add Candidate</span>
              </button>
            </div>

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
                    {candidates.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())).map(candidate => (
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
                            candidate.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {candidate.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button onClick={() => handleEdit('candidate', candidate)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button onClick={() => handleDelete('candidate', candidate.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Manage Notifications</h2>
              <button
                onClick={() => handleAdd('notification')}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
              >
                <PlusCircle className="h-5 w-5" />
                <span>Create Notification</span>
              </button>
            </div>

            <div className="grid gap-6">
              {notifications.map(notification => (
                <div key={notification.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Bell className="h-6 w-6 text-blue-600" />
                        <h3 className="text-lg font-bold text-gray-800">{notification.title}</h3>
                        {notification.sent && (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center space-x-1">
                            <CheckCircle className="h-3 w-3" />
                            <span>Sent</span>
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-3">{notification.message}</p>
                      <p className="text-sm text-gray-500">Date: {notification.date}</p>
                    </div>
                    <div className="flex space-x-2">
                      {!notification.sent && (
                        <button
                          onClick={() => sendNotification(notification.id)}
                          className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors flex items-center space-x-2"
                        >
                          <Send className="h-4 w-4" />
                          <span className="text-sm font-semibold">Send</span>
                        </button>
                      )}
                      <button onClick={() => handleDelete('notification', notification.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showModal === 'election' && (
        <Modal title="Schedule New Election">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Election Name</label>
              <input type="text" placeholder="e.g., Lok Sabha Election 2024" onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                <select onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select Type</option>
                  <option value="National">National (Lok Sabha)</option>
                  <option value="State">State (Vidhan Sabha)</option>
                  <option value="Local">Local (Municipal)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="Scheduled">Scheduled</option>
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
                <input type="date" onChange={(e) => setFormData({...formData, startDate: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
                <input type="date" onChange={(e) => setFormData({...formData, endDate: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>
            <button onClick={() => handleSubmit('election')} className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
              Create Election
            </button>
          </div>
        </Modal>
      )}

      {showModal === 'party' && (
        <Modal title="Add New Party">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Party Name</label>
              <input type="text" placeholder="e.g., National Unity Party" onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Party Symbol (Emoji)</label>
              <input type="text" placeholder="e.g., 🦁" maxLength="2" onChange={(e) => setFormData({...formData, symbol: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-2xl text-center" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Party Leader</label>
              <input type="text" placeholder="Leader name" onChange={(e) => setFormData({...formData, leader: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Party Color</label>
              <select onChange={(e) => setFormData({...formData, color: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select Color</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="red">Red</option>
                <option value="purple">Purple</option>
                <option value="orange">Orange</option>
                <option value="emerald">Emerald</option>
              </select>
            </div>
            <button onClick={() => handleSubmit('party')} className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
              Add Party
            </button>
          </div>
        </Modal>
      )}

      {showModal === 'candidate' && (
        <Modal title="Add New Candidate">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Candidate Name</label>
              <input type="text" placeholder="Full name" onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Party</label>
              <select onChange={(e) => setFormData({...formData, party: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select Party</option>
                {parties.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Constituency</label>
              <input type="text" placeholder="e.g., Mumbai North" onChange={(e) => setFormData({...formData, constituency: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
              <select onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <button onClick={() => handleSubmit('candidate')} className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
              Add Candidate
            </button>
          </div>
        </Modal>
      )}

      {showModal === 'notification' && (
        <Modal title="Create Notification">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Notification Title</label>
              <input type="text" placeholder="e.g., Election Started" onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
              <textarea rows="4" placeholder="Enter notification message..." onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <button onClick={() => handleSubmit('notification')} className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
              Create & Send Later
            </button>
          </div>
        </Modal>
      )}

      {(showModal?.startsWith('edit-')) && (
        <Modal title={`Edit ${showModal.replace('edit-', '').charAt(0).toUpperCase() + showModal.replace('edit-', '').slice(1)}`}>
          <div className="space-y-4">
            {showModal === 'edit-election' && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Election Name</label>
                  <input type="text" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                    <select value={formData.type || ''} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="National">National (Lok Sabha)</option>
                      <option value="State">State (Vidhan Sabha)</option>
                      <option value="Local">Local (Municipal)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                    <select value={formData.status || ''} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="Scheduled">Scheduled</option>
                      <option value="Active">Active</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
                <button onClick={() => handleUpdate('election')} className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                  Update Election
                </button>
              </>
            )}
            {showModal === 'edit-party' && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Party Name</label>
                  <input type="text" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Party Leader</label>
                  <input type="text" value={formData.leader || ''} onChange={(e) => setFormData({...formData, leader: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <button onClick={() => handleUpdate('party')} className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                  Update Party
                </button>
              </>
            )}
            {showModal === 'edit-candidate' && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Candidate Name</label>
                  <input type="text" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select value={formData.status || ''} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <button onClick={() => handleUpdate('candidate')} className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                  Update Candidate
                </button>
              </>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminPanel;