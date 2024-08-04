import React, { useContext } from 'react';
import BookingContext from '../contexts/BookingContext';
import AuthContext from '../contexts/AuthContext';

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const { bookings,getBookings } = useContext(BookingContext);

  if(user){
    getBookings();
  }

  if (!user) {
    return <div className="text-red-500 text-center">You are not authorized to view this page.</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">My Booked Events</h2>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id} className="my-4 p-4 border rounded">
              <h3 className="text-lg font-bold">{booking.event?.title}</h3>
              <p>Number of Tickets: {booking.numberOfTickets}</p>
              <p>Date: {booking.event ? new Date(booking.event.date).toString().slice(0, 15) : 'N/A'}</p>
              <p>Price: ${booking.event?.price}</p>
              <p>Vendor: {booking.event?.vendor}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default UserProfile;
