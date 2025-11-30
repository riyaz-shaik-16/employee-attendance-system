import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/auth.slice";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SiteHeader } from "@/components/site-header";

export default function ProfilePage() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  if (!user) return <div className="p-6">Loading...</div>;

  return (
    <div className="flex flex-col gap-6 p-6">
      <SiteHeader title="My Profile" />

      <Card className="w-full max-w-xl mx-auto shadow-md border border-border">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Employee Details</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col items-center gap-2">
            <div className="size-24 rounded-full bg-primary/20 flex items-center justify-center text-3xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>
          </div>

          <Separator />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Employee ID:</span>
              <span className="font-medium">{user.employeeId}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Department:</span>
              <span className="font-medium">{user.department}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Role:</span>
              <span className="font-medium capitalize">{user.role}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Joined:</span>
              <span className="font-medium">
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <Button variant="outline" disabled>
              Edit Profile (soon)
            </Button>

            <Button variant="destructive" onClick={() => dispatch(logout())}>
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
