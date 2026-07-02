"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUIStore } from "../stores/ui-store";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { bottomNavigation, navigation } from "@/lib/navigation";

import { Clock4 } from "lucide-react";

export function AppSidebar() {
  const pathname = usePathname();

  const activeTool = useUIStore((s) => s.activeTool);
  const setActiveTool = useUIStore((s) => s.setActiveTool);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-3 px-2 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Clock4 className="h-5 w-5" />
          </div>

          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-semibold">Beepo</span>
            <span className="text-xs text-muted-foreground">
              Time made fun
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={activeTool === item.tool}
                    tooltip={item.title}
                    onClick={() => setActiveTool(item.tool)}
                  >
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          {bottomNavigation.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
              //   isActive={activeTool === item.tool}
              //   tooltip={item.title}
              //   onClick={() => setActiveTool(item.tool)}
               >
                <item.icon className="size-4" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}