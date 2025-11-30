import { useEffect, useState } from "react";
import api from "@/api/axiosInstance";

import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function SummaryPage() {
  const [months, setMonths] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      const res = await api.get("/attendance/my-summary");

      // Filter out months with no attendance at all
      const filtered = res.data.months.filter(
        (m) => m.present !== 0 || m.late !== 0 || m.absent !== 0
      );

      setMonths(filtered);
    };

    fetchSummary();
  }, []);

  if (months.length === 0)
    return (
      <div className="p-6 text-center text-lg text-muted-foreground">
        No attendance summary data available.
      </div>
    );

  const COLORS = ["#22c55e", "#eab308", "#ef4444"];

  return (
    <div className="flex flex-col gap-8 p-6">
      <SiteHeader title="Monthly Summary" />

      {months.map((month) => {
        const pieData = [
          { name: "Present", value: month.present },
          { name: "Late", value: month.late },
          { name: "Absent", value: month.absent },
        ];

        const total = month.present + month.late + month.absent;

        return (
          <div key={month.month} className="space-y-4 pb-10 border-b">
            {/* Month Title */}
            <h2 className="text-2xl font-semibold mt-2">{month.month}</h2>

            {/* Stats Cards */}
            <SectionCards thisMonth={month} />

            {/* Only show chart if >0 */}
            {total > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <PieChart width={350} height={300}>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      dataKey="value"
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </CardContent>
              </Card>
            ) : (
              <p className="text-sm text-muted-foreground px-4">
                No attendance records to show for this month.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
