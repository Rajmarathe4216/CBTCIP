import React, { useContext, useState } from 'react';
import EventContext from '../contexts/EventContext';
import UpdateEvent from './UpdateEvent';
import EventDetails from './EventDetails';

const ViewEvent = () => {
  const { events, deleteEvent } = useContext(EventContext);

  const [action, setAction] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleUpdateClick = (event) => {
    setSelectedEvent(event);
    setAction('update');
  };

  const handleDeleteClick = (event) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this event?");
    if (isConfirmed) {
      deleteEvent(event);
    } else {
      console.log("Delete action canceled");
    }
    setAction('view'); 
  };

  const handleViewClick = (event) => {
    setSelectedEvent(event);
    setAction('view');
  };

  const handleCancel = () => {
    setSelectedEvent(null);
    setAction('view');
  };

  if (!events || events.length === 0) {
    return <div className="text-red-500 font-bold text-center">No Events. Create One!</div>;
  }

  return (
    <>
      <div className="mt-4">
        {action === 'update' && selectedEvent ? (
          <UpdateEvent event={selectedEvent} onCancel={handleCancel} />
        ) : action === 'view' && selectedEvent ? (
          <EventDetails event={selectedEvent} onCancel={handleCancel} />
        ) : (
          <div className="relative overflow-x-auto shadow-md">
            <table className="w-full text-sm text-center text-green-500">
              <thead className='text-[12px] text-gray-200 uppercase bg-gray-500'>
                <tr>
                  <th scope='col' className='px-2 py-3'>S.No.</th>
                  <th scope='col' className='px-2 py-3'>Event Name</th>
                  <th scope='col' className='px-2 py-3'>Description</th>
                  <th scope='col' className='px-2 py-3'>Date</th>
                  <th scope='col' className='px-2 py-3'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, i) => (
                  <tr key={event._id} className='border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-600'>
                    <th
                      scope='row'
                      className='px-6 py-1 font-medium text-gray-900 whitespace-nowrap bg-gray-50'>
                      {i + 1}
                    </th>
                    <th
                      scope='row'
                      className='px-6 py-1 font-medium text-gray-900 whitespace-nowrap bg-gray-50'>
                      {event.title}</th>
                    <td className='px-6 py-1'>{(event.description).slice(0,30)}...</td>
                    <td className='px-6 py-1'>{new Date(event.date).toString().slice(0, 15)}</td>
                    <td className='px-6 py-1'>
                      <div className="flex gap-x-4 justify-center">
                        <button
                          onClick={() => handleViewClick(event)}
                          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300">
                          View
                        </button>
                        <button
                          onClick={() => handleUpdateClick(event)}
                          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
                          Update
                        </button>
                        <button
                          onClick={() => handleDeleteClick(event)}
                          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewEvent;
