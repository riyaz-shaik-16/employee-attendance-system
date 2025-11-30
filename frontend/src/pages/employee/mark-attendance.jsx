import { useEffect, useState } from "react";
import api from "@/api/axiosInstance";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site-header";

export default function MarkAttendance() {
  const [loading, setLoading] = useState(true);
  const [today, setToday] = useState(null);

  // Fetch today's attendance
  const loadTodayStatus = async () => {
    try {
      const res = await api.get("/attendance/today");
      setToday(res.data);
    } catch (err) {
      toast.error("Failed to load attendance");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodayStatus();
  }, []);

  const handleCheckIn = async () => {
    try {
      await api.post("/attendance/checkin");
      toast.success("Checked in successfully");
      loadTodayStatus();
    } catch (err) {
      toast.error(err.response?.data?.message || "Check-in failed");
    }
  };

  const handleCheckOut = async () => {
    try {
      await api.post("/attendance/checkout");
      toast.success("Checked out successfully");
      loadTodayStatus();
    } catch (err) {
      toast.error(err.response?.data?.message || "Check-out failed");
    }
  };

  if (loading || !today) return <div className="p-6">Loading...</div>;

  const { status, checkedIn, checkedOut, checkInTime, checkOutTime } = today;

  return (
    <div className="flex flex-col gap-6 p-6">
      <SiteHeader title="Mark Attendance" />

      {/* Today Status Card */}
      <Card>
        <CardHeader>
          <CardTitle>Today’s Attendance</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          {/* Status Badge */}
          <div
            className={`px-3 py-1 w-fit rounded-md text-lg font-semibold capitalize ${
              status === "present"
                ? "bg-green-200 text-green-900"
                : status === "late"
                ? "bg-yellow-200 text-yellow-900"
                : status === "absent"
                ? "bg-red-200 text-red-900"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {status}
          </div>

          {/* Check-in / Check-out times */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Check In</p>
              <p className="font-medium">
                {checkedIn
                  ? new Date(checkInTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "--"}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Check Out</p>
              <p className="font-medium">
                {checkedOut
                  ? new Date(checkOutTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "--"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={handleCheckIn}
          disabled={checkedIn}
          className="w-40"
        >
          {checkedIn ? "Checked In" : "Check In"}
        </Button>

        <Button
          variant="destructive"
          onClick={handleCheckOut}
          disabled={!checkedIn || checkedOut}
          className="w-40"
        >
          {checkedOut ? "Checked Out" : "Check Out"}
        </Button>
      </div>
    </div>
  );
}
