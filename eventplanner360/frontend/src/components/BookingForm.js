import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BookingContext from '../contexts/BookingContext';

const BookingForm = () => {
    const location = useLocation();
    const event = location.state?.event;
    const user = location.state?.user;
    const { addBooking } = useContext(BookingContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        numberOfTickets: 1,
        nameOnCard: '',
        cardNumber: '',
        validThrough: '',
        cvv: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    if (!user) {
        return <div className="text-red-500 text-center">You are not authorized to view this page.</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const bookingData = {
          eventId: event._id,
          numberOfTickets: formData.numberOfTickets,
          nameOnCard: formData.nameOnCard,
          cardNumber: formData.cardNumber,
          validThrough: formData.validThrough,
          cvv: formData.cvv,
        };
      
        try {
          await addBooking(bookingData);
          alert("Event Booked");
          navigate('/');
        } catch (error) {
          console.error('Error booking event:', error);
        }
      };
      

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
            <div className="mb-4">
                <label className="block text-gray-700">Number of Tickets</label>
                <input
                    type="number"
                    name="numberOfTickets"
                    value={formData.numberOfTickets}
                    onChange={handleChange}
                    min="1"
                    max={event.ticket}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Name on Card</label>
                <input
                    type="text"
                    name="nameOnCard"
                    value={formData.nameOnCard}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Card Number</label>
                <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Valid Through</label>
                <input
                    type="text"
                    name="validThrough"
                    value={formData.validThrough}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">CVV</label>
                <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
                Book Event
            </button>
        </form>
    );
};

export default BookingForm;
