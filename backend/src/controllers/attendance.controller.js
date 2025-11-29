import Attendance from "../models/attendance.model.js";
import User from '../models/user.model.js'
import { Parser } from "json2csv";

export const checkIn = async (req, res) => {
  const userId = req.user._id;
  const date = new Date().toISOString().slice(0, 10);

  let record = await Attendance.findOne({ user: userId, date });

  if (record?.checkIn)
    return res.status(400).json({ message: "Already checked in today." });

  if (!record) {
    record = await Attendance.create({
      user: userId,
      date,
      checkIn: new Date(),
      status: "present"
    });
  } else {
    record.checkIn = new Date();
    await record.save();
  }

  res.json(record);
};


export const checkOut = async (req, res) => {
  const userId = req.user._id;
  const date = new Date().toISOString().slice(0, 10);

  const record = await Attendance.findOne({ user: userId, date });

  if (!record || !record.checkIn)
    return res.status(400).json({ message: "Check-in missing" });

  if (record.checkOut)
    return res.status(400).json({ message: "Already checked out" });

  record.checkOut = new Date();

  const diff = (record.checkOut - record.checkIn) / (1000 * 60 * 60); // hours

  record.totalHours = parseFloat(diff.toFixed(2));
  await record.save();

  res.json(record);
};


export const getMyAttendanceHistory = async (req, res) => {
  const userId = req.user._id;

  const records = await Attendance.find({ user: userId }).sort({ date: -1 });

  res.json(records);
};


export const getMySummary = async (req, res) => {
  const userId = req.user._id;

  // current month
  const now = new Date();
  const month = now.toISOString().slice(0, 7); // YYYY-MM

  const records = await Attendance.find({
    user: userId,
    date: { $regex: `^${month}` }
  });

  let present = 0;
  let absent = 0;
  let late = 0;
  let totalHours = 0;

  for (const r of records) {
    if (r.status === "present") present++;
    if (r.status === "late") late++;
    if (r.status === "absent") absent++;
    totalHours += r.totalHours || 0;
  }

  res.json({
    month,
    present,
    late,
    absent,
    totalHours: totalHours.toFixed(2)
  });
};

export const getTodayStatus = async (req, res) => {
  const userId = req.user._id;
  const today = new Date().toISOString().slice(0, 10);

  const record = await Attendance.findOne({ user: userId, date: today });

  if (!record) {
    return res.json({
      date: today,
      checkedIn: false,
      checkedOut: false,
      status: "absent"
    });
  }

  res.json({
    date: record.date,
    checkedIn: Boolean(record.checkIn),
    checkedOut: Boolean(record.checkOut),
    checkInTime: record.checkIn,
    checkOutTime: record.checkOut,
    status: record.status
  });
};


export const getAllEmployeesWithAttendance = async (req, res) => {
  const employees = await User.find({ role: "employee" });

  const today = new Date().toISOString().slice(0, 10);
  const month = today.slice(0, 7);

  const result = [];

  for (const emp of employees) {

    // today attendance
    const todayRecord = await Attendance.findOne({
      user: emp._id,
      date: today
    });

    // month attendance
    const monthRecords = await Attendance.find({
      user: emp._id,
      date: { $regex: `^${month}` }
    });

    let present = 0, late = 0, absent = 0, totalHours = 0;

    monthRecords.forEach(r => {
      if (r.status === "present") present++;
      if (r.status === "late") late++;
      if (r.status === "absent") absent++;
      totalHours += r.totalHours || 0;
    });

    result.push({
      employeeId: emp.employeeId,
      name: emp.name,
      email: emp.email,
      department: emp.department,
      todayStatus: todayRecord ? todayRecord.status : "absent",
      thisMonth: {
        present,
        late,
        absent,
        totalHours: Number(totalHours.toFixed(2))
      }
    });
  }

  res.json(result);
};


export const getEmployeeAttendance = async (req, res) => {
  const employeeId = req.params.id;

  const records = await Attendance.findOne({ user: employeeId });

  res.json(records);
};

export const getTeamTodayStatus = async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);

  const employees = await User.find({ role: "employee" });

  const attendance = await Attendance.find({ date: today });

  const present = [];
  const absent = [];
  const late = [];
  const notCheckedIn = [];

  for (const emp of employees) {
    const record = attendance.find(r => r.user.toString() === emp._id.toString());

    if (!record) {
      absent.push(emp);
      continue;
    }

    if (!record.checkIn) {
      notCheckedIn.push(emp);
      continue;
    }

    if (record.status === "late") late.push(emp);
    else present.push(emp);
  }

  res.json({ present, late, absent, notCheckedIn });
};


export const getAllSummary = async (req, res) => {
  const employees = await User.find({ role: "employee" });

  let summary = [];

  for (const emp of employees) {
    const records = await Attendance.find({ user: emp._id });

    let present = 0;
    let absent = 0;
    let late = 0;
    let totalHours = 0;

    for (const r of records) {
      if (r.status === "present") present++;
      if (r.status === "late") late++;
      if (r.status === "absent") absent++;
      totalHours += r.totalHours || 0;
    }

    summary.push({
      employeeId: emp.employeeId,
      name: emp.name,
      department: emp.department,
      present,
      late,
      absent,
      totalHours: totalHours.toFixed(2)
    });
  }

  res.json(summary);
};

export const exportCSV = async (req, res) => {
  const data = await Attendance.find()
    .populate("user", "name email employeeId");

  const rows = data.map(d => ({
    employeeId: d.user.employeeId,
    name: d.user.name,
    date: d.date,
    checkIn: d.checkIn,
    checkOut: d.checkOut,
    status: d.status,
    totalHours: d.totalHours
  }));

  const parser = new Parser();
  const csv = parser.parse(rows);

  res.header("Content-Type", "text/csv");
  res.attachment(`attendance-all.csv`);
  return res.send(csv);
};
