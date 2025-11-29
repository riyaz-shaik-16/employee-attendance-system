import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { requireManager } from "../middleware/role.middleware.js";
import {
  getEmployeeDashboard,
  getManagerDashboard
} from "../controllers/dashboard.controller.js";

const router = Router();

router.get("/employee", protect, getEmployeeDashboard);
router.get("/manager", protect, requireManager, getManagerDashboard);

export default router;
