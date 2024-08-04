import UserModel from "../models/user.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

//register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const existUser = await UserModel.findOne({ email })
    if (existUser) {
      return res.status(401).json({ success: false, message: "User Already Exist" })
    }

    const hashpassword = await bcryptjs.hashSync(password, 10)
    const newUser = new UserModel({
      name, email, password: hashpassword
    })
    await newUser.save()
    res.status(200).json({ message: 'User Registered Successfully', newUser })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' })
    console.log(error)
  }
}

// login 
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await UserModel.findOne({ email })
    if (!user) {
      return res.status(404).json({ success: false, message: "Invalid Credentials" })
    }
    const isMatch = await bcryptjs.compare(password, user.password)
    if (!isMatch) {
      return res.status(404).json({ success: false, message: "Invalid Password" })
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
    res.cookie('token',token,{
      httpOnly:true,
      //while hosting app make secure:true
      secure:false,
      maxAge:3600000
    })
    res.status(200).json({ success: true, message: "Login Successfull", user,token })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' })
    console.log(error)
  }
}

// Logout 

const logout =async(req,res)=>{
  try {
    res.clearCookie('token')
    res.status(200).json({message:"User Logout Successfully"})
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' })
    console.log(error)
  }
}

//get user only for admin
const getallUser=async(req,res)=>{
  try {
    const users= await UserModel.find()
    res.status(200).json({users})
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' })
    console.log(error)
  }
}

//get user

const getUser=async(req,res)=>{
  try {
    const userId = req.user.id;
    const user= await UserModel.findById(userId).select("-password")
    res.status(200).json({user})
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' })
    console.log(error)
  }
}

// delete user only for admin

const deleteUser= async(req,res)=>{
  try {
    const userId=req.params.id
    const checkAdmin=await UserModel.findById(userId)
    if(checkAdmin.role =='admin'){
      return res.status(409).json({message:"You Cannot Delete Youself"})
    }

    const user=await UserModel.findByIdAndDelete(userId)
    if(!user){
      res.status(404).json({ message: 'User Not Found' })
    }
    res.status(200).json({message: 'User Deleted Successfully',user})
  } catch (error) {
    res.status(500).json({message: 'Internal Server Error' })
    console.log(error)
  }
}

export { register, login,logout,getUser,getallUser,deleteUser }