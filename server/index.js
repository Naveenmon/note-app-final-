import express from 'express'
import connectDB from './utils/db.js'
import cors from 'cors'
import authRouter from './routes/auth.route.js'
import noteRoute from './routes/note.route.js'

const app = express()
app.use(express.json())

app.use(cors({
    origin: "*"
}))

app.use("/api/auth", authRouter)
app.use("/api/notes", noteRoute)

app.listen(5000, () => {
    console.log("Server is running")
})
connectDB();