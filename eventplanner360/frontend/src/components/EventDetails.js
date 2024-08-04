import React from 'react';

const EventDetails = ({ event, onCancel }) => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div key={event.id} className="event-card bg-blue-300 w-full max-w-md shadow-lg rounded-lg text-center p-5">
                <h3 className="text-lg font-bold my-5 uppercase">{event.title}</h3>
                <p className="mb-2">{event.description}</p>
                <p className="text-gray-900 font-bold">Date: <span className="text-gray-600">{new Date(event.date).toString().slice(0, 15)}</span></p>
                <p className="text-gray-900 font-bold">Budget: <span className="text-gray-600">${event.budget}</span></p>
                <p className="text-gray-900 font-bold">Price: <span className="text-gray-600">${event.price}</span></p>
                <p className="text-gray-900 font-bold">Ticket: <span className="text-gray-600">{event.ticket}</span></p>
                <p className="text-gray-900 font-bold">Vendor: <span className="text-gray-600">{event.vendor}</span></p>
                <div className="text-gray-900 font-bold mt-3">Guests:
                    {event.guests.map((guest, index) => (
                        <div key={index} className="mt-2">
                            <p className="text-blue-700 text-sm">Name: <span className="text-gray-600">{guest.name}</span></p>
                            <p className="text-blue-700 text-sm">Email: <span className="text-gray-600">{guest.email}</span></p>
                            <p className="text-blue-700 text-sm">Phone: <span className="text-gray-600">{guest.phone}</span></p>
                            <p className="text-blue-700 text-sm">RSVP: <span className="text-gray-600">{guest.rsvp}</span></p>
                        </div>
                    ))}
                </div>
                <button
                    onClick={onCancel}
                    className="bg-gray-900 text-white py-2 px-4 my-5 rounded hover:bg-blue-600 transition duration-300"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default EventDetails;
