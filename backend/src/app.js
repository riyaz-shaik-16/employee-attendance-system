import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";



const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res)=>{
    return res.json({
        message:"Hi!"
    })
})
app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/dashboard", dashboardRoutes);


export default app;
