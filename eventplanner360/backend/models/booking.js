import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'event',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  numberOfTickets: {
    type: Number,
    required: true,
  },
  nameOnCard: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  validThrough: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const BookingModel = mongoose.model('booking', bookingSchema);

export default BookingModel;
