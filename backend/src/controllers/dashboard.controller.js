import Attendance from "../models/attendance.model.js";
import User from "../models/user.model.js"

export const getEmployeeDashboard = async (req, res) => {
  const userId = req.user._id;
  console.log(userId);

  console.log("This hit")
  const today = new Date().toISOString().slice(0, 10);
  const month = today.slice(0, 7); // YYYY-MM

  // ----- Today Status -----
  const todayRecord = await Attendance.findOne({ user: userId, date: today });

  const todayStatus = todayRecord
    ? todayRecord.status
    : "absent";

  // ----- This Month Summary -----
  const monthRecords = await Attendance.find({
    user: userId,
    date: { $regex: `^${month}` }
  });

  let present = 0, late = 0, absent = 0, totalHours = 0;

  monthRecords.forEach(r => {
    if (r.status === "present") present++;
    if (r.status === "late") late++;
    if (r.status === "absent") absent++;
    totalHours += r.totalHours || 0;
  });

  // ----- Recent Attendance -----
  const recentAttendance = await Attendance
    .find({ user: userId })
    .sort({ date: -1 })
    .limit(5);

  res.json({
    todayStatus,
    thisMonth: {
      present,
      late,
      absent,
      totalHours: Number(totalHours.toFixed(2))
    },
    recentAttendance
  });
};


export const getManagerDashboard = async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);

  // ----- Total Employees -----
  const employees = await User.find({ role: "employee" });
  const totalEmployees = employees.length;

  // ----- Today's Attendance -----
  const todayRecords = await Attendance.find({ date: today }).populate("user");

  let present = 0, late = 0, absent = 0, notCheckedIn = 0;

  employees.forEach(emp => {
    const rec = todayRecords.find(r => r.user._id.equals(emp._id));

    if (!rec) {
      absent++;
      return;
    }

    if (!rec.checkIn) {
      notCheckedIn++;
      return;
    }

    if (rec.status === "late") late++;
    else present++;
  });

  // ----- Weekly Trend (last 7 days) -----
  const trend = [];
  const now = new Date();

  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);

    const dateStr = d.toISOString().slice(0, 10);
    const records = await Attendance.find({ date: dateStr });

    trend.push({
      date: dateStr,
      count: records.length
    });
  }

  // ----- Department Wise -----
  const departments = {};

  employees.forEach(emp => {
    if (!departments[emp.department]) departments[emp.department] = 0;
    departments[emp.department]++;
  });

  res.json({
    totalEmployees,
    todayStatus: { present, late, absent, notCheckedIn },
    weeklyTrend: trend,
    departmentWise: departments
  });
};

