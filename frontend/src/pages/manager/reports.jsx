import { useState } from "react";
import api from "@/api/axiosInstance";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { IconDownload } from "@tabler/icons-react";

export default function ReportsPage() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);

      const res = await api.get("/attendance/export", {
        responseType: "blob",
      });

      const blob = new Blob([res.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "attendance_report.csv";
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to download report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      <SiteHeader title="Reports" />

      <Card className="max-w-xl border rounded-xl shadow-md">
        <CardHeader>
          <CardTitle>Attendance Reports</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Export team attendance as a CSV report.  
            Useful for audits, payroll, and HR processing.
          </p>

          <Button
            onClick={handleDownload}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <IconDownload size={18} />
            {loading ? "Downloading..." : "Download CSV"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
