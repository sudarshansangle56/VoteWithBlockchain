import React from 'react';
import { X } from 'lucide-react';

// This is now a reusable component
// It takes an `onClose` prop instead of directly calling setShowModal
const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <X className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  </div>
);

export default Modal;
