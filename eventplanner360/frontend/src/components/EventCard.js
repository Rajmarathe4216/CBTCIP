import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const EventCard = ({ event }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/register");
  };

  const handleUserEvent = () => {
    navigate("/booking", { state: { event, user } });
  };

  return (
    <div className="flex justify-center items-center">
      <div key={event._id} className="event-card bg-blue-300 w-full shadow-lg rounded-lg text-center">
        <h3 className="text-lg font-bold my-5 uppercase">{event.title}</h3>
        <p className="mb-2">{event.description}</p>
        <p className="text-gray-600">Date: {new Date(event.date).toString().slice(0, 15)}</p>
        <p className="text-gray-600">Budget: ${event.budget}</p>
        <p className="text-gray-600">Price: ${event.price}</p>
        <p className="text-gray-600">Available Ticket: {event.ticket}</p>
        <p className="text-gray-600">Vendor: {event.vendor}</p>

        {!user && (
          <button
            onClick={handleBookNow}
            className="bg-gray-900 text-white py-2 px-4 my-5 rounded hover:bg-blue-600 transition duration-300"
          >
            Book Now
          </button>
        )}
        {user && user.role === "user" &&(
          <button
            onClick={handleUserEvent}
            className="bg-gray-900 text-white py-2 px-4 my-5 rounded hover:bg-blue-600 transition duration-300"
          >
            Book Event
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
