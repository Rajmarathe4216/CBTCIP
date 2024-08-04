import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import DBconnect from './config/db.js'
import AuthRoutes from './routes/auth.js'
import EventRoutes from './routes/events.js'
import BookingRoutes from './routes/bookings.js'
dotenv.config()
const PORT=process.env.PORT || 3000
const app=express()

//Mongodb connection 
DBconnect()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:"http://localhost:3000"
}))

app.use('/api/auth',AuthRoutes)
app.use('/api/events',EventRoutes)
app.use('/api/bookings',BookingRoutes)

app.get('/',(req,res)=>{
    res.send('test')
})

app.listen(PORT,()=>{
    console.log(`Server is runnning on ${PORT}`)
})