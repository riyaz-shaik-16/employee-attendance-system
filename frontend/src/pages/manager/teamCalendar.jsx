import { useEffect, useState } from "react";
import api from "@/api/axiosInstance";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/site-header";

const COLORS = {
  present: "#22c55e", // green
  late: "#eab308",    // yellow
  absent: "#ef4444",  // red
  none: "#d1d5db",    // gray
};

// generate 30-day heatmap from summary
function buildHeatmap(summary) {
  const totalDays = 30;
  const { present, late, absent } = summary;

  const cells = [];

  for (let i = 0; i < present; i++) cells.push("present");
  for (let i = 0; i < late; i++) cells.push("late");
  for (let i = 0; i < absent; i++) cells.push("absent");

  while (cells.length < totalDays) cells.push("none");

  // shuffle for natural look
  return cells.sort(() => Math.random() - 0.5);
}

export default function TeamCalendar() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    api.get("/attendance/all").then((res) => setEmployees(res.data));
  }, []);

  if (employees.length === 0)
    return <div className="p-6">Loading team calendar...</div>;

  return (
    <div className="p-6 flex flex-col gap-6">
      <SiteHeader title="Team Attendance Calendar" />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {employees.map((emp) => {
          const heatmap = buildHeatmap(emp.thisMonth);

          return (
            <Card key={emp.employeeId} className="border rounded-xl shadow-sm">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{emp.name}</span>
                  <Badge variant="secondary">{emp.department}</Badge>
                </CardTitle>

                <div className="flex gap-2 mt-2">
                  <Badge
                    className={
                      emp.todayStatus === "present"
                        ? "bg-green-600"
                        : emp.todayStatus === "late"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }
                  >
                    Today: {emp.todayStatus}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-10 gap-1 mt-4">
                  {heatmap.map((status, i) => (
                    <div
                      key={i}
                      className="h-4 w-4 rounded-sm"
                      style={{ backgroundColor: COLORS[status] }}
                    ></div>
                  ))}
                </div>

                <div className="flex gap-4 text-sm text-muted-foreground mt-3">
                  <div className="flex items-center gap-1">
                    <span className="h-3 w-3 bg-green-500 rounded-sm"></span>{" "}
                    Present
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="h-3 w-3 bg-yellow-500 rounded-sm"></span>{" "}
                    Late
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="h-3 w-3 bg-red-500 rounded-sm"></span>{" "}
                    Absent
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
