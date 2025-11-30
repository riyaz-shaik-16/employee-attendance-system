import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchEmployeeDashboard } from "@/store/dashboard.slice";

import { AttendanceHoursChart } from "@/components/chart-area-interactive";
import { AttendanceTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";

export default function EmployeeDashboard() {
  

  const { loading, thisMonth, recentAttendance } = useSelector(
    (state) => state.dashboard
  );

  if (loading || !thisMonth) return <div className="p-6">Loading...</div>;

  return (
    <div className="flex flex-col gap-6 p-6">
      <SiteHeader title="Dashboard" />

      {/* Cards */}
      <SectionCards thisMonth={thisMonth} />

      {/* Chart */}
      <div className="px-4 lg:px-6">
        <AttendanceHoursChart recentAttendance={recentAttendance} />
      </div>

      {/* Table */}
      <AttendanceTable data={recentAttendance} />
    </div>
  );
}
