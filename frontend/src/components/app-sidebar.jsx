import * as React from "react"
import {
  IconInnerShadowTop,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSelector } from "react-redux"

export function AppSidebar({ navItems, panelTitle, ...props }) {
  const user = useSelector((state) => state.auth.user)
  const { name, email } = user || {}

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
              <a href="#">
                <IconInnerShadowTop className="size-5!" />
                <span className="text-base font-semibold">{panelTitle}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* MAIN MENU */}
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>

      {/* FOOTER USER */}
      <SidebarFooter>
        <NavUser user={{ name, email }} />
      </SidebarFooter>
    </Sidebar>
  )
}
