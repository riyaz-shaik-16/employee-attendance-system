// src/pages/manager/AllEmployeesAttendance.jsx

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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function AllEmployeesAttendance() {
  const [employees, setEmployees] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/attendance/all");
      setEmployees(res.data);
      setFiltered(res.data);
    };
    fetchData();
  }, []);

  // Filtering Logic
  useEffect(() => {
    let result = employees;

    // search filter
    if (search.trim() !== "") {
      result = result.filter((emp) =>
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    // department filter
    if (deptFilter !== "all") {
      result = result.filter((emp) => emp.department === deptFilter);
    }

    // status filter
    if (statusFilter !== "all") {
      result = result.filter((emp) => emp.todayStatus === statusFilter);
    }

    setFiltered(result);
  }, [search, deptFilter, statusFilter, employees]);

  const statusColors = {
    present: "bg-green-500",
    late: "bg-yellow-500",
    absent: "bg-red-500",
  };

  return (
    <div className="flex flex-col gap-8 p-6">
      <SiteHeader title="All Employees Attendance" />

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Select onValueChange={setDeptFilter} defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="HR">HR</SelectItem>
              <SelectItem value="IT">IT</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="Support">Support</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setStatusFilter} defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Today Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="present">Present</SelectItem>
              <SelectItem value="late">Late</SelectItem>
              <SelectItem value="absent">Absent</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Employees Attendance</CardTitle>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Today</TableHead>
                <TableHead className="text-right">Present</TableHead>
                <TableHead className="text-right">Late</TableHead>
                <TableHead className="text-right">Absent</TableHead>
                <TableHead className="text-right">Hours</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6">
                    No employees found.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((emp) => (
                  <TableRow key={emp.employeeId}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{emp.name}</span>
                        <span className="text-xs text-muted-foreground">{emp.email}</span>
                      </div>
                    </TableCell>

                    <TableCell>{emp.department}</TableCell>

                    <TableCell>
                      <Badge
                        className={`
                          text-white capitalize 
                          ${statusColors[emp.todayStatus]}
                        `}
                      >
                        {emp.todayStatus}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right">{emp.thisMonth.present}</TableCell>
                    <TableCell className="text-right">{emp.thisMonth.late}</TableCell>
                    <TableCell className="text-right">{emp.thisMonth.absent}</TableCell>
                    <TableCell className="text-right">{emp.thisMonth.totalHours}</TableCell>

                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          (window.location.href = `/manager/employee/${emp.employeeId}/history`)
                        }
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
