import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useDispatch } from "react-redux";
import { fetchEmployeeDashboard } from "@/store/dashboard.slice";
import { useEffect } from "react";
import employeeNav from "@/constants/employeeNavItems";

export default function EmployeeLayout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEmployeeDashboard());
  }, []);
  return (
    <SidebarProvider>
      <AppSidebar
        navItems={employeeNav.navMain}
        panelTitle="Employee Panel"
        variant="inset"
      />
      <SidebarInset>
        <div className="flex flex-1 flex-col overflow-y-auto">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
