import express from "express";
import cors from "cors";
import "dotenv/config";
import multer from "multer";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import employeesRouter from "./routes/EmployeeRoutes.js";
import ProfileRouter from "./routes/ProfileRoutes.js";
import attendanceRouter from "./routes/attendanceRouter.js";
import leaveRouter from "./routes/leaveRouter.js";
import payslipRouter from "./routes/payslipsRouter.js";

const app = express()
const PORT = process.env.PORT || 4000;

//Middleware

app.use(cors())
app.use(express.json())
app.use(multer().none())

//Routes

app.get("/", (req, res) => res.send("Server is running"))
app.use("/api.auth",authRouter)
app.use("/api.employees",employeesRouter)
app.use("/api.profile",ProfileRouter)
app.use("/api.attendance",attendanceRouter)
app.use("/api.leave",leaveRouter)
app.use("/api.payslips",payslipRouter)




await connectDB()
app.listen(PORT, ()=> console.log(`Server runing on port ${PORT}`))