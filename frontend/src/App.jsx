import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/protectedRoute";
import PublicRoute from "./components/publicRoute";

// employee layout + pages
import EmployeeLayout from "./components/layout/employeeLayout";
import EmployeeDashboard from "./pages/employee/dashboard";
import MarkAttendance from "./pages/employee/mark-attendance";
import History from "./pages/employee/history";
import Summary from "./pages/employee/summary";
import Profile from "./pages/employee/profile";

// manager layout + pages
import ManagerLayout from "./components/layout/managerLayout";
import ManagerDashboard from "./pages/manager/dashboard";
import AllEmployeesAttendance from "./pages/manager/allAttendance";
import TeamCalendar from "./pages/manager/teamCalendar";
import ReportsPage from "./pages/manager/reports";
import EmployeesPage from "./pages/manager/employees";
import ManagerProfilePage from "./pages/manager/profile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* EMPLOYEE ROUTES */}
        <Route
          path="/employee"
          element={
            <ProtectedRoute role="employee">
              <EmployeeLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<EmployeeDashboard />} />
          <Route path="mark-attendance" element={<MarkAttendance />} />
          <Route path="history" element={<History />} />
          <Route path="summary" element={<Summary />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* MANAGER ROUTES */}
        <Route
          path="/manager"
          element={
            <ProtectedRoute role="manager">
              <ManagerLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<ManagerDashboard />} />
          <Route path="attendance" element={<AllEmployeesAttendance />} />
          <Route path="team-calendar" element={<TeamCalendar />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="profile" element={<ManagerProfilePage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
