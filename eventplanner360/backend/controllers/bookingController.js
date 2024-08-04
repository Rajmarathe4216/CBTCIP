import BookingModel from '../models/booking.js';
import EventModel from '../models/event.js';

const bookEvent = async(req,res) =>{
    const { eventId, numberOfTickets, nameOnCard, cardNumber, validThrough, cvv } = req.body;
  const userId = req.user.id; // Assuming user ID is available in req.user

  try {
    const event = await EventModel.findById(eventId);
    if (event.ticket < numberOfTickets) {
      return res.status(400).json({ success: false, message: 'Not enough tickets available' });
    }

    const booking = new BookingModel({
      event: eventId,
      user: userId,
      numberOfTickets,
      nameOnCard,
      cardNumber,
      validThrough,
      cvv
    });
    await booking.save();

    event.ticket -= numberOfTickets;
    await event.save();

    res.json({ success: true, message: 'Event booked successfully' });
  } catch (error) {
    console.error('Error booking event:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

//Get event

const getBooking = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const bookings = await BookingModel.find({ user: userId }).populate('event');
      res.json({ bookings });
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };

  export {bookEvent,getBooking};