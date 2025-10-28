import React from 'react';
import { Bell, PlusCircle, Trash2, Send, CheckCircle } from 'lucide-react';

const NotificationsTab = ({ notifications, onAdd, onDelete, onSend }) => (
  <div className="space-y-6">
    {/* Header and Add Button */}
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-gray-800">Manage Notifications</h2>
      <button
        onClick={onAdd}
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
      >
        <PlusCircle className="h-5 w-5" />
        <span>Create Notification</span>
      </button>
    </div>

    {/* Notifications List */}
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
                  onClick={() => onSend(notification.id)}
                  className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors flex items-center space-x-2"
                >
                  <Send className="h-4 w-4" />
                  <span className="text-sm font-semibold">Send</span>
                </button>
              )}
              <button onClick={() => onDelete(notification.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
      {notifications.length === 0 && (
        <p className="text-center text-gray-500">You have no notifications.</p>
      )}
    </div>
  </div>
);

export default NotificationsTab;
