import express from 'express'
import { deleteUser, getallUser, getUser, login, logout, register } from '../controllers/authController.js'
import { isAdmin, isUser } from '../middleware/auth.js'
const AuthRoutes=express.Router()

AuthRoutes.post('/register',register)
AuthRoutes.post('/login',login)
AuthRoutes.post('/logout',logout)
AuthRoutes.get('/getalluser',isAdmin,getallUser)
AuthRoutes.get('/getuser',isUser,getUser)
AuthRoutes.post('/deleteuser/:id',isAdmin,deleteUser)

export default AuthRoutes