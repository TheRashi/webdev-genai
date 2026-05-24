const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require ("cors")



const app = express() // initiate a server

app.use(express.json()) // create an instance of the server and use the json middleware or API's
app.use(cookieParser())
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}))

const authRouter = require("./src/routes/auth.routes")
const interviewRouter = require ("./src/routes/interview.routes")

app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)


module.exports = app




