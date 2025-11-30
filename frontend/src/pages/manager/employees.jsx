import { useEffect, useState } from "react";
import api from "@/api/axiosInstance";
import { SiteHeader } from "@/components/site-header";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/attendance/all");
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filtered = employees.filter((emp) => {
    const s = search.toLowerCase();
    return (
      emp.name.toLowerCase().includes(s) ||
      emp.email.toLowerCase().includes(s) ||
      emp.department.toLowerCase().includes(s)
    );
  });

  const statusColor = {
    present: "bg-green-600",
    late: "bg-yellow-600",
    absent: "bg-red-600",
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      <SiteHeader title="All Employees" />

      {/* Search */}
      <Input
        placeholder="Search by name, email or department..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      {/* Employee Table */}
      <Card className="shadow-lg border rounded-xl">
        <CardHeader>
          <CardTitle>Employee Attendance Overview</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-muted/40">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Employee ID</th>
                  <th className="p-3 text-left">Department</th>
                  <th className="p-3 text-left">Today</th>
                  <th className="p-3 text-left">This Month</th>
                  <th className="p-3 text-left">Hours</th>
                </tr>
              </thead>

              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-6 text-center text-muted-foreground">
                      No employees found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((emp) => (
                    <tr
                      key={emp.employeeId}
                      className="border-b hover:bg-accent/30 transition cursor-pointer"
                    >
                      <td className="p-3 font-medium">{emp.name}</td>

                      <td className="p-3 text-muted-foreground">
                        {emp.employeeId}
                      </td>

                      <td className="p-3">{emp.department}</td>

                      {/* Today Status */}
                      <td className="p-3">
                        <Badge
                          className={`text-white ${statusColor[emp.todayStatus]}`}
                        >
                          {emp.todayStatus.charAt(0).toUpperCase() +
                            emp.todayStatus.slice(1)}
                        </Badge>
                      </td>

                      {/* This Month Summary */}
                      <td className="p-3">
                        <span className="font-medium text-green-600">
                          {emp.thisMonth.present} Present
                        </span>
                        {" / "}
                        <span className="font-medium text-yellow-600">
                          {emp.thisMonth.late} Late
                        </span>
                        {" / "}
                        <span className="font-medium text-red-600">
                          {emp.thisMonth.absent} Absent
                        </span>
                      </td>

                      <td className="p-3 font-semibold">
                        {emp.thisMonth.totalHours} hrs
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
