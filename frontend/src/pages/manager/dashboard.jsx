import { useSelector } from "react-redux";
import { SiteHeader } from "@/components/site-header";
import { SectionCards } from "@/components/section-cards";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { PieChart, Pie, Cell } from "recharts";

export default function ManagerDashboard() {
  const { totalEmployees, todayStatus, weeklyTrend, departmentWise } = useSelector(
    (state) => state.manager
  );

  if (!todayStatus) return <div className="p-6">Loading dashboard...</div>;

  // Pie chart colors
  const COLORS = ["#22c55e", "#3b82f6", "#eab308", "#ef4444", "#8b5cf6"];

  // Convert departmentWise into array format
  const deptData = Object.entries(departmentWise).map(([key, value]) => ({
    name: key,
    value,
  }));

  return (
    <div className="flex flex-col gap-8 p-6">
      <SiteHeader title="Manager Dashboard" />

      {/* ==== Summary Cards ==== */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <SectionCards
          thisMonth={{
            present: todayStatus.present,
            late: todayStatus.late,
            absent: todayStatus.absent,
            totalHours: totalEmployees,
          }}
          hideHours
          title="Today Overview"
          labels={{
            present: "Present Today",
            late: "Late Today",
            absent: "Absent Today",
            totalHours: "Total Employees",
          }}
        />
      </div>

      {/* ==== Weekly Trend Chart ==== */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Attendance Trend</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyTrend}>
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ==== Department Wise Distribution ==== */}
      <Card>
        <CardHeader>
          <CardTitle>Department Wise Employees</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center">
          <PieChart width={400} height={350}>
            <Pie
              data={deptData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              dataKey="value"
              label
            >
              {deptData.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </CardContent>
      </Card>
    </div>
  );
}
