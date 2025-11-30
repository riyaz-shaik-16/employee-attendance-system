import {
  IconLayoutDashboard,
  IconUsers,
  IconCalendarMonth,
  IconReportAnalytics,
  IconListDetails,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";

const managerNav = {
  navMain: [
    {
      title: "Dashboard",
      url: "/manager/dashboard",
      icon: IconLayoutDashboard,
    },
    {
      title: "All Attendance",
      url: "/manager/attendance",
      icon: IconListDetails,
    },
    {
      title: "Team Calendar",
      url: "/manager/team-calendar",
      icon: IconCalendarMonth,
    },
    {
      title: "Reports",
      url: "/manager/reports",
      icon: IconReportAnalytics,
    },
    {
      title: "Employees",
      url: "/manager/employees",
      icon: IconUsers,
    },
    {
      title:"Profile",
      url:"/manager/profile",
      icon:IconUsers
    }
  ],
};

export default managerNav;
