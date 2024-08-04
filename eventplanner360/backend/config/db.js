import mongoose from "mongoose";

const DBconnect=async()=>{
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Mongo DB is connected')
  } catch (error) {
    console.log(error)
  }
}

export default DBconnect