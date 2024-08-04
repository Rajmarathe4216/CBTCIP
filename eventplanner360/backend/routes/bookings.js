import express from 'express'
import { isAdmin, isUser } from '../middleware/auth.js'
import { bookEvent, getBooking } from '../controllers/bookingController.js'
const BookingRoutes=express.Router()

BookingRoutes.post('/bookevent',isUser,bookEvent)
BookingRoutes.get('/getbooking',isUser,getBooking)

export default BookingRoutes