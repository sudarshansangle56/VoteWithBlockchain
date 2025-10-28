import React, { useState, useEffect } from 'react';
import { 
  Users, Vote, Bell, PlusCircle, Search, BarChart3, TrendingUp, 
  Send, X, CheckCircle, Award, AlertCircle 
} from 'lucide-react';
import DashboardTab from '../components/DashboardTab';
import ElectionsTab from '../components/ElectionsTab';
import PartiesTab from '../components/PartiesTab';
import CandidatesTab from '../components/CandidatesTab';
import NotificationsTab from '../components/NotificationsTab'
import Modal from '../components/Modal';
import StatCard from '../components/StatCard';
import { useNavigate } from "react-router-dom";


const API_URL = 'http://localhost:5000/api';


const mapApiData = (item) => ({ ...item, id: item._id });
const mapApiArray = (data) => data.map(mapApiData);




  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };


const getErrorMessage = async (res, defaultMessage) => {
  let errorMsg = defaultMessage;
  try {
    const errorData = await res.json();
    errorMsg = errorData.message || errorData.error || errorMsg;
  } catch (e) {
    // Ignore if response is not JSON or has no body
  }
  return errorMsg;
};

const AdminPanel = () => {
  const navigate = useNavigate();
  // All state is now initialized as empty
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(null);
  const [elections, setElections] = useState([]);
  const [parties, setParties] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [formData, setFormData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  // --- New state for custom alerts and confirmations ---
  const [modalMessage, setModalMessage] = useState(null); // For alerts
  const [confirmation, setConfirmation] = useState(null); // For delete confirmation

  // --- Data Fetching (GET) ---
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [elecRes, partyRes, candRes, notifRes] = await Promise.all([
          fetch(`${API_URL}/elections`),
          fetch(`${API_URL}/parties`),
          fetch(`${API_URL}/candidates`),
          fetch(`${API_URL}/notifications`)
        ]);

        if (!elecRes.ok || !partyRes.ok || !candRes.ok || !notifRes.ok) {
          // You could be more granular here, but for now, one message is fine.
          throw new Error('Failed to fetch initial data. Is the backend running?');
        }

        setElections(mapApiArray(await elecRes.json()));
        setParties(mapApiArray(await partyRes.json()));
        setCandidates(mapApiArray(await candRes.json()));
        setNotifications(mapApiArray(await notifRes.json()));

      } catch (error) {
        console.error("Error fetching data:", error.message);
        setModalMessage(error.message); // Show error to user
      }
    };

    fetchAllData();
  }, []); // Empty dependency array means this runs once on mount

  // --- Derived State ---
  const stats = [
    { label: 'Total Elections', value: elections.length, icon: Vote, color: 'from-blue-500 to-cyan-500' },
    { label: 'Total Parties', value: parties.length, icon: Award, color: 'from-purple-500 to-pink-500' },
    { label: 'Total Candidates', value: candidates.length, icon: Users, color: 'from-orange-500 to-amber-500' },
    { label: 'Total Votes', value: elections.reduce((sum, e) => sum + e.totalVotes, 0).toLocaleString(), icon: TrendingUp, color: 'from-green-500 to-emerald-500' }
  ];

  // --- Event Handlers (CRUD Operations) ---

  const handleAdd = (type) => {
    setShowModal(type);
    setFormData({});
  };

  const handleEdit = (type, item) => {
    setShowModal(`edit-${type}`);
    setFormData(item);
  };

  const handleSubmit = async (type) => {
    let endpoint = `${API_URL}/${type}s`;
    if (type === "party") endpoint = `${API_URL}/parties`; // fix plural form
  
    const cleanedData = Object.fromEntries(
      Object.entries(formData).filter(([_, v]) => v !== undefined && v !== "")
    );
  
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedData),
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(
          `Failed to create ${type}: ${res.status} ${res.statusText} - ${errorText}`
        );
      }
  
      const newItem = await res.json();
  
      if (type === "election") {
        setElections((prev) => [...prev, newItem]);
      } else if (type === "party") {
        setParties((prev) => [...prev, newItem]);
      } else if (type === "candidate") {
        setCandidates((prev) => [...prev, newItem]);
      } else if (type === "notification") {
        setNotifications((prev) => [...prev, newItem]);
      }
  
      setShowModal(null);
      setFormData({});
      setModalMessage(
        `${type.charAt(0).toUpperCase() + type.slice(1)} created successfully!`
      );
    } catch (error) {
      console.error(`Error creating ${type}:`, error.message);
      setModalMessage(`Error: ${error.message}`);
    }
  };
  

  /**
   * UPDATE (PUT)
   */
  const handleUpdate = async (type) => {
    const endpoint = `${API_URL}/${type}s/${formData.id}`;
    
    try {
      const res = await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorMsg = await getErrorMessage(res, `Failed to update ${type}`);
        throw new Error(errorMsg);
      }

      const updatedItem = await res.json();
      const updatedItemWithId = mapApiData(updatedItem);

      if (type === 'election') setElections(prev => prev.map(e => e.id === updatedItemWithId.id ? updatedItemWithId : e));
      else if (type === 'party') setParties(prev => prev.map(p => p.id === updatedItemWithId.id ? updatedItemWithId : p));
      else if (type === 'candidate') setCandidates(prev => prev.map(c => c.id === updatedItemWithId.id ? updatedItemWithId : c));
      
      setShowModal(null);
      setFormData({});
      setModalMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully!`);

    } catch (error) {
      console.error(`Error updating ${type}:`, error.message);
      setModalMessage(`Error: ${error.message}`);
    }
  };

  /**
   * DELETE (DELETE) - Step 1: Request confirmation
   */
  const handleDelete = (type, id) => {
    // Instead of confirm(), set state to show our custom modal
    setConfirmation({
      message: `Are you sure you want to delete this ${type}?`,
      onConfirm: () => executeDelete(type, id), // Pass the function to execute
      onCancel: () => setConfirmation(null),
    });
  };

  /**
   * DELETE (DELETE) - Step 2: Execute deletion after confirmation
   */
  const executeDelete = async (type, id) => {
    const endpoint = `${API_URL}/${type}s/${id}`;
    
    try {
      const res = await fetch(endpoint, { method: 'DELETE' });
      
      if (!res.ok) {
        const errorMsg = await getErrorMessage(res, `Failed to delete ${type}`);
        throw new Error(errorMsg);
      }

      if (type === 'election') setElections(prev => prev.filter(e => e.id !== id));
      else if (type === 'party') setParties(prev => prev.filter(p => p.id !== id));
      else if (type === 'candidate') setCandidates(prev => prev.filter(c => c.id !== id));
      else if (type === 'notification') setNotifications(prev => prev.filter(n => n.id !== id));

    } catch (error) {
      console.error(`Error deleting ${type}:`, error.message);
      setModalMessage(`Error: ${error.message}`);
    }
    
    setConfirmation(null); // Close confirmation modal regardless of outcome
  };


  /**
   * Special UPDATE (PUT) for sending a notification
   */
  const sendNotification = async (id) => {
    const notification = notifications.find(n => n.id === id);
    if (!notification) return;
    
    const update = { ...notification, sent: true };

    try {
      const res = await fetch(`${API_URL}/notifications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(update),
      });

      if (!res.ok) {
        const errorMsg = await getErrorMessage(res, 'Failed to send notification');
        throw new Error(errorMsg);
      }

      const updatedItem = await res.json();
      const updatedItemWithId = mapApiData(updatedItem);

      setNotifications(prev => prev.map(n => n.id === id ? updatedItemWithId : n));
      setModalMessage('Notification sent successfully!'); // Replaced alert()

    } catch (error) {
      console.error('Error sending notification:', error.message);
      setModalMessage(`Error: ${error.message}`); // Replaced alert()
    }
  };

  // --- Tab definitions (no change) ---
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'elections', label: 'Elections', icon: Vote },
    { id: 'parties', label: 'Parties', icon: Award },
    { id: 'candidates', label: 'Candidates', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  const filteredElections = elections.filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredParties = parties.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredCandidates = candidates.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 relative">
        {/* Navigation Tabs */}
        <div className="mb-8 bg-white/60 backdrop-blur-sm rounded-2xl p-2 border border-gray-200 shadow-sm overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSearchTerm(''); 
                }}
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

        {/* Conditional Tab Content */}
        {activeTab === 'dashboard' && (
          <DashboardTab
            stats={stats}
            elections={elections}
            candidates={candidates}
          />
        )}
        
        {activeTab === 'elections' && (
          <ElectionsTab
            elections={filteredElections}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onAdd={() => handleAdd('election')}
            onEdit={(item) => handleEdit('election', item)}
            onDelete={(id) => handleDelete('election', id)}
          />
        )}
        
        {activeTab === 'parties' && (
          <PartiesTab
            parties={filteredParties}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onAdd={() => handleAdd('party')}
            onEdit={(item) => handleEdit('party', item)}
            onDelete={(id) => handleDelete('party', id)}
          />
        )}
        
        {activeTab === 'candidates' && (
          <CandidatesTab
            candidates={filteredCandidates}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onAdd={() => handleAdd('candidate')}
            onEdit={(item) => handleEdit('candidate', item)}
            onDelete={(id) => handleDelete('candidate', id)}
          />
        )}
        
        {activeTab === 'notifications' && (
          <NotificationsTab
            notifications={notifications}
            onAdd={() => handleAdd('notification')}
            onDelete={(id) => handleDelete('notification', id)}
            onSend={sendNotification}
          />
        )}
      </div>

      {/* --- CRUD Modals (Unchanged) --- */}
      
      {/* Add Election Modal */}
      {showModal === 'election' && (
        <Modal title="Schedule New Election" onClose={() => setShowModal(null)}>
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
                <select onChange={(e) => setFormData({...formData, status: e.target.value})} defaultValue="Scheduled" className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
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

      {/* Add Party Modal */}
      {showModal === 'party' && (
        <Modal title="Add New Party" onClose={() => setShowModal(null)}>
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

      {/* Add Candidate Modal */}
      {showModal === 'candidate' && (
        <Modal title="Add New Candidate" onClose={() => setShowModal(null)}>
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
              <select onChange={(e) => setFormData({...formData, status: e.target.value})} defaultValue="Pending" className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
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

      {/* Add Notification Modal */}
      {showModal === 'notification' && (
        <Modal title="Create Notification" onClose={() => setShowModal(null)}>
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

      {/* --- Edit Modals (Unchanged) --- */}
      {(showModal?.startsWith('edit-')) && (
        <Modal 
          title={`Edit ${showModal.replace('edit-', '').charAt(0).toUpperCase() + showModal.slice(6)}`}
          onClose={() => setShowModal(null)}
        >
          <div className="space-y-4">
            
            {/* Edit Election Form */}
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
            
            {/* Edit Party Form */}
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
            
            {/* Edit Candidate Form */}
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

      {/* --- Custom Alert Modal --- */}
      {modalMessage && (
        <Modal title="Notification" onClose={() => setModalMessage(null)}>
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <AlertCircle className="w-12 h-12 text-blue-500" />
            </div>
            <p className="text-lg text-gray-700 mb-6">{modalMessage}</p>
            <button
              onClick={() => setModalMessage(null)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
            >
              OK
            </button>
          </div>
        </Modal>
      )}

      {/* --- Custom Confirmation Modal --- */}
      {confirmation && (
        <Modal title="Confirm Action" onClose={confirmation.onCancel}>
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <AlertCircle className="w-12 h-12 text-red-500" />
            </div>
            <p className="text-lg text-gray-700 mb-8">{confirmation.message}</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmation.onCancel}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmation.onConfirm}
                className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};

export default AdminPanel;