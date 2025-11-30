import {
  IconLayoutDashboard,
  IconClock,
  IconListDetails,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react"

const employeeNavItems = {
  navMain: [
    {
      title: "Dashboard",
      url: "/employee/dashboard",
      icon: IconLayoutDashboard,
    },
    {
      title: "Mark Attendance",
      url: "/employee/mark-attendance",
      icon: IconClock,
    },
    {
      title: "Attendance History",
      url: "/employee/history",
      icon: IconListDetails,
    },
    {
      title: "Monthly Summary",
      url: "/employee/summary",
      icon: IconCalendarStats,
    },
    {
      title: "Profile",
      url: "/employee/profile",
      icon: IconUser,
    },
  ]
}

export default employeeNavItems
