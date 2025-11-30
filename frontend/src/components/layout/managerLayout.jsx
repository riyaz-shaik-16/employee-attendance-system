import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import managerNav from "@/constants/managerNavItems"; 

import { fetchManagerDashboard } from "@/store/manager.slice"; 

export default function ManagerLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchManagerDashboard());
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar
        navItems={managerNav.navMain}
        panelTitle="Manager Panel"
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
