import express from 'express'
import { getallEvents, getEvent, addEvent, updateEvent, deleteEvent } from '../controllers/eventController.js'
import { isAdmin, isUser } from '../middleware/auth.js'
const EventRoutes=express.Router()

EventRoutes.post('/addevent',isAdmin,addEvent)
EventRoutes.get('/getallevent',getallEvents)
EventRoutes.get('/getevent',isUser,getEvent)
EventRoutes.delete('/deleteevent/:id',isAdmin,deleteEvent)
EventRoutes.put('/updateevent/:id',isAdmin,updateEvent)

export default EventRoutes