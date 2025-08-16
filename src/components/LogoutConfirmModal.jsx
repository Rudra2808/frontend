import React from 'react';

const LogoutConfirmModal = ({ show, onCancel, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-end z-50">
      <div className="bg-white w-full sm:max-w-md p-6 rounded-t-xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">Confirm Logout</h2>
        <p className="text-gray-600 mb-4">
          You are about to logout. Are you sure you want to proceed?
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="bg-gray-200 px-4 py-2 rounded text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmModal;
