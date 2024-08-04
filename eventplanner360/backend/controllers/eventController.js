import EventModel from '../models/event.js';

// Get all events
const getallEvents = async (req, res) => {
  try {
    const event = await EventModel.find();
    res.status(200).json({ event });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.log(error);
  }
};

// Get an event by ID
const getEvent = async (req, res) => {
  try {
    const event = await EventModel.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event Not Found' });
    }
    res.status(200).json({event});
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.log(error);
  }
};

// Add an event
const addEvent = async (req, res) => {
  const { title, description, date, budget, guests, price, vendor, rsvp } = req.body;
  try {
    const newEvent = new EventModel({
      title,
      description,
      date,
      budget,
      guests,
      price,
      vendor,
      rsvp,
    });

    await newEvent.save();
    res.status(200).json({ message: 'Event Created Successfully', newEvent });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.log(error);
  }
};

// Update an event by ID
const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await EventModel.findByIdAndUpdate(req.params.id, req.body);
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event Not Found' });
    }
    res.status(200).json({ message: 'Event Updated Successfully', updatedEvent });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.log(error);
  }
};

// Delete an event by ID
const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await EventModel.findByIdAndDelete(eventId,req.body);
    if (!event) {
      return res.status(404).json({ message: 'Event Not Found' });
    }
    res.status(200).json({ message: 'Event Deleted Successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    console.log(error);
  }
};

export { getallEvents, getEvent, addEvent, updateEvent, deleteEvent };
