import React, { useContext, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import CreateEvent from './CreateEvent';
import ViewEvent from './ViewEvent';
import EventContext from '../contexts/EventContext';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const { viewEvent } = useContext(EventContext);

  const [action, setAction] = useState('');

  const handleCreateClick = () => setAction('create');
  const handleViewClick = () => {
    viewEvent();
    setAction('view')
  };

  if (!user || !user.role === "admin") {
    return <div className="text-red-500 text-center">You are not authorized to view this page.</div>;
  }

  return (
    <div className="admin-dashboard p-6 bg-gray-100 min-h-screen flex-auto">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Admin Dashboard</h1>
      <h2 className="text-2xl font-semibold text-center text-gray-600 mb-6">Manage Events</h2>

      <div className="flex mt-8 gap-3 justify-evenly">
        <button onClick={handleCreateClick}
          className="bg-green-500 text-white py-2 px-4 rounded mt-4 hover:bg-green-600 transition duration-300"
        >
          Create Event
        </button>
        <button onClick={handleViewClick}
          className="bg-yellow-500 text-white py-2 px-4 rounded mt-4 hover:bg-yellow-600 transition duration-300"
        >
          View All Events
        </button>
        
      </div>
      
      <div className="mt-4">
        {action === 'create' && <CreateEvent />}
        {action === 'view' && <ViewEvent />}
      </div>
    </div>
  );
};

export default AdminDashboard;
