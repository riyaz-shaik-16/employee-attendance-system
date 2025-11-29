// src/seed/seedAttendance.js
import Attendance from "../models/attendance.model.js";
import User from "../models/user.model.js";

const randomTime = (hourStart, hourEnd) => {
  const hour = Math.floor(Math.random() * (hourEnd - hourStart + 1)) + hourStart;
  const minute = Math.floor(Math.random() * 60);
  return { hour, minute };
};

export const seedAttendance = async () => {
  await Attendance.deleteMany({});

  const employees = await User.find({ role: "employee" });
  const today = new Date();

  for (const emp of employees) {
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);

      const dateStr = d.toISOString().slice(0, 10);

      // 20% chance absent
      if (Math.random() < 0.2) {
        await Attendance.create({
          user: emp._id,
          date: dateStr,
          status: "absent",
          totalHours: 0
        });
        continue;
      }

      // Check-in: 8:45–10:30 AM
      const ci = randomTime(8, 10);
      const checkIn = new Date(d);
      checkIn.setHours(ci.hour, ci.minute, 0);

      // Check-out: 4:30–7:00 PM
      const co = randomTime(16, 19);
      const checkOut = new Date(d);
      checkOut.setHours(co.hour, co.minute, 0);

      const totalHours = (checkOut - checkIn) / (1000 * 60 * 60);
      const status = ci.hour >= 9 ? "late" : "present";

      await Attendance.create({
        user: emp._id,
        date: dateStr,
        checkIn,
        checkOut,
        status,
        totalHours: Number(totalHours.toFixed(2))
      });
    }
  }

  console.log("Attendance for last 30 days created ✔");
};
