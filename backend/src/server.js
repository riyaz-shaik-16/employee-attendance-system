import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";
// import { seedUsers } from "./seed/users.seed.js";
// import { seedAttendance } from "./seed/attendance.seed.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    // await seedUsers();
    // await seedAttendance();

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (err) {
    console.error("Error:", err.message);
  }
};

startServer();

