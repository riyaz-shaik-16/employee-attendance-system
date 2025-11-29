import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { requireManager } from "../middleware/role.middleware.js";

import {
  checkIn,
  checkOut,
  getMyAttendanceHistory,
  getTodayStatus,
  getMySummary,
  getEmployeeAttendance,
  getTeamTodayStatus,
  getAllSummary,
  exportCSV,
  getAllEmployeesWithAttendance
} from "../controllers/attendance.controller.js";

const router = Router();

router.post("/checkin", protect, checkIn);
router.post("/checkout", protect, checkOut);

router.get("/my-history", protect, getMyAttendanceHistory);
router.get("/today", protect, getTodayStatus);
router.get("/my-summary", protect, getMySummary);

router.get("/all", protect, requireManager, getAllEmployeesWithAttendance);

router.get("/employee/:id", protect, requireManager, getEmployeeAttendance);
router.get("/today-status", protect, requireManager, getTeamTodayStatus);
router.get("/summary", protect, requireManager, getAllSummary);
router.get("/export", protect, requireManager, exportCSV);



export default router;
