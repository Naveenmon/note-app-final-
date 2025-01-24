import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

const register = async (req, res) => {
    const { name, email, password } = req.body;

    try{
        if(!name) {
            res.status(400).json({ message:"Name required"})
        }
        if(!email) {
            res.status(400).json({ message:"Email required"})
        }
        if(!password) {
            res.status(400).json({ message:"Password required"})
        }
        const user = await User.findOne({ email });
            console.log(user, 'user')
        if(user){
            res.status(400).json({ message: "User already Exists"})
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })
        const savedUser = await newUser.save();

        res.status(200).json({error: false, message:"Registered successfuly", user: {id: savedUser._id,
            name: savedUser.name,
            email:savedUser.email}})
    } catch(error) {
        console.log("Error in register")
        res.status(400).json({error: `${error}`})
    }
}


const login = async (req, res) => {
    const { email, password } = req.body

    try{
        const user = await User.findOne({ email })

        if(!user){
            return res.status(401).json({ message: "User Not Found"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            return res.status(401).json({ message: 'Invalid password'})
        }

        const secret = process.env.MY_SECRET

        const token = jwt.sign({ name: user.name, email: user.email}, secret, { expiresIn: '7d'})

        res.json({ token })



    } catch(error) {
        console.log(error)   
    }
}

export { register, login};