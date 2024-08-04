import React, { useContext, useEffect, useState } from 'react';
import EventContext from '../contexts/EventContext';

const UpdateEvent = ({ event, onCancel }) => {
  const { updateEvent } = useContext(EventContext);

  const [newEvent, setNewEvent] = useState({
    title: '',
      description: '',
      date: '',
      budget: '',
      guests: [{ name: '', email: '', phone: '', rsvp: 'Maybe' }],
      price: '',
      ticket: '',
      vendor: '',
  });

  useEffect(() => {
    if (event) {
      // Format the date to yyyy-MM-dd
      const formattedEvent = {
        ...event,
        date: new Date(event.date).toISOString().split('T')[0]
      };
      setNewEvent(formattedEvent);
    }
  }, [event]);

  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleGuestChange = (index, e) => {
    const { name, value } = e.target;
    const newGuests = [...newEvent.guests];
    newGuests[index][name] = value;
    setNewEvent({ ...newEvent, guests: newGuests });
  };

  const addGuest = () => {
    setNewEvent({
      ...newEvent,
      guests: [...newEvent.guests, { name: '', email: '', phone: '', rsvp: 'Maybe' }],
    });
  };

  const removeGuest = (index) => {
    const newGuests = newEvent.guests.filter((_, guestIndex) => guestIndex !== index);
    setNewEvent({ ...newEvent, guests: newGuests });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEvent(newEvent);
    onCancel(); // Return to view after update
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-gray-700 mb-4">Update Event</h3>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Event Description"
            value={newEvent.description}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="date"
            name="date"
            placeholder="Date"
            value={newEvent.date}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="number"
            name="budget"
            placeholder="Budget"
            value={newEvent.budget}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newEvent.price}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="number"
            name="ticket"
            placeholder="Ticket"
            value={newEvent.ticket}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="text"
            name="vendor"
            placeholder="Vendor"
            value={newEvent.vendor}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
              <label>Guests:</label>
              {newEvent.guests.map((guest, index) => (
                <div key={index}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={guest.name}
                    onChange={(e) => handleGuestChange(index, e)}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={guest.email}
                    onChange={(e) => handleGuestChange(index, e)}
                    required
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={guest.phone}
                    onChange={(e) => handleGuestChange(index, e)}
                  />
                  <select name="rsvp" value={guest.rsvp} onChange={(e) => handleGuestChange(index, e)} required>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Maybe">Maybe</option>
                  </select>
                  <button type="button" onClick={() => removeGuest(index)}>Remove Guest</button>
                </div>
              ))}
              <button type="button" onClick={addGuest}>Add Guest</button>
            </div>
        <div className="flex justify-center gap-3">
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded mt-4 hover:bg-green-600 transition duration-300"
        >
          Update Event
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-red-500 text-white py-2 px-4 rounded mt-4 hover:bg-red-600 transition duration-300"
        >
          Cancel
        </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEvent;
