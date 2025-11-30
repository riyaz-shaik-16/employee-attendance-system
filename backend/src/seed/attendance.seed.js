// src/seed/seedAttendance.js
import Attendance from "../models/attendance.model.js";
import User from "../models/user.model.js";

const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const makeTime = (baseDate, hour, minute) => {
  const d = new Date(baseDate);
  d.setHours(hour, minute, 0, 0);
  return d;
};

export const seedAttendance = async () => {
  await Attendance.deleteMany({});

  const employees = await User.find({ role: "employee" });

  const today = new Date();
  const totalDays = 180; // 6 months approx

  for (const emp of employees) {
    for (let i = 0; i < totalDays; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i); // go backwards

      const dateStr = d.toISOString().slice(0, 10);

      // Weekend skip (optional)
      if (d.getDay() === 0) continue; // Sunday
      if (d.getDay() === 6 && Math.random() < 0.5) continue; // Sat half working

      // Attendance probability
      const roll = Math.random();

      // 10% Absent
      if (roll < 0.1) {
        await Attendance.create({
          user: emp._id,
          date: dateStr,
          status: "absent",
          totalHours: 0,
          checkIn: null,
          checkOut: null,
        });
        continue;
      }

      // 70% Present, 20% Late
      const isLate = roll >= 0.7;

      let checkInHour, checkInMinute;

      if (!isLate) {
        // Present: 8:30 AM - 9:15 AM
        checkInHour = randomBetween(8, 9);
        checkInMinute = randomBetween(0, 59);

        if (checkInHour === 9) checkInMinute = randomBetween(0, 15);
      } else {
        // Late: 9:15 AM - 11:00 AM
        checkInHour = randomBetween(9, 11);
        checkInMinute = randomBetween(0, 59);

        if (checkInHour === 9) checkInMinute = randomBetween(15, 59);
      }

      const checkIn = makeTime(d, checkInHour, checkInMinute);

      // Checkout 4:30 PM - 7:30 PM
      const coHour = randomBetween(16, 19);
      const coMin = randomBetween(0, 59);
      const checkOut = makeTime(d, coHour, coMin);

      const totalHours = Number(((checkOut - checkIn) / (1000 * 60 * 60)).toFixed(2));

      await Attendance.create({
        user: emp._id,
        date: dateStr,
        checkIn,
        checkOut,
        status: isLate ? "late" : "present",
        totalHours,
      });
    }
  }

  console.log("✔ Seeded realistic 6 months attendance for all employees");
};
