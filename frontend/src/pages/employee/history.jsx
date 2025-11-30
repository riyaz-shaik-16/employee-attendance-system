import { useEffect, useState } from "react";
import api from "@/api/axiosInstance";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function AttendanceHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const res = await api.get("/attendance/my-history");
      setHistory(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <SiteHeader title="Attendance History" />
        <Card><CardContent className="p-4 space-y-3">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </CardContent></Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <SiteHeader title="Attendance History" />

      <Card>
        <CardHeader>
          <CardTitle>Your Monthly Attendance Records</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead className="text-right">Total Hours</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {history.map((item) => {
                const checkIn = item.checkIn
                  ? new Date(item.checkIn).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "--";

                const checkOut = item.checkOut
                  ? new Date(item.checkOut).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "--";

                return (
                  <TableRow key={item._id}>

                    {/* Date */}
                    <TableCell className="font-medium">
                      {new Date(item.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>

                    {/* Status Badge */}
                    <TableCell>
                      <Badge
                        className={cn(
                          "capitalize",
                          item.status === "present" && "bg-green-200 text-green-900",
                          item.status === "late" && "bg-yellow-200 text-yellow-900",
                          item.status === "absent" && "bg-red-200 text-red-900"
                        )}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>

                    {/* Check in/out */}
                    <TableCell>{checkIn}</TableCell>
                    <TableCell>{checkOut}</TableCell>

                    {/* Hours */}
                    <TableCell className="text-right font-medium">
                      {item.totalHours.toFixed(2)}
                    </TableCell>

                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
