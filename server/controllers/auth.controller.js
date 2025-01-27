import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

const register = async (req, res) => {
    const { name, email, password } = req.body;

    try{
        if(!name) {
            res.status(400).json({ success:false, message:"Name required"})
        }
        if(!email) {
            return res.status(400).json({ success:false, message:"Email required"})
        }
        if(!password) {
            return res.status(400).json({ success: false, message:"Password required"})
        }
        const user = await User.findOne({ email });
            console.log(user, 'user')
        if(user){
            return res.status(400).json({ success: false, message: "User already Exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })
        const savedUser = await newUser.save();

        return res.status(200).json({ success: true, message:"Registered successfuly", user: {id: savedUser._id,
            name: savedUser.name,
            email:savedUser.email}})
    } catch(error) {
        console.log("Error in register")
        return res.status(400).json({success: false, message: "Internal Server Error"})
    }
}


const login = async (req, res) => {
    const { email, password } = req.body

    try{
        const user = await User.findOne({ email })

        if(!user){
            return res.status(401).json({ success: false, message: "User Not Found"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            return res.status(401).json({ success: false, message: 'Invalid password'})
        }

        const secret = process.env.MY_SECRET

        const token = jwt.sign({ name: user.name, email: user.email}, secret, { expiresIn: '7d'})

        res.json({ success: true, message:"Logged In Successfully", token })

    } catch(error) {
        console.log(error)   
    }
}

export { register, login};