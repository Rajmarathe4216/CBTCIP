import mongoose from "mongoose";

const eventSchema=new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  guests: [
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: false,
      },
      rsvp: {
        type: String,
        enum: ['Yes', 'No', 'Maybe'],
        default: 'Maybe',
      },
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  ticket: {
    type: Number,
    required: true,
  },
  vendor: {
    type: String,
    required: true,
  },
},{timestamps:true});

const EventModel = mongoose.model('event', eventSchema);

export default EventModel
