"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
  useSidebar,
} from "@/components/ui/sidebar";

import { navigation } from "@/lib/navigation";
import { ChevronsUpDown, Clock4, InfinityIcon, LucideGalleryThumbnails, Settings } from "lucide-react";
import { Badge } from "../ui/badge";

export function AppSidebar() {
  const pathname = usePathname();

  const {isMobile, setOpenMobile} = useSidebar()

  const handleItemClick = ()=> {
    if(isMobile){
      setOpenMobile(false)
    }
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size={"lg"} render={
                <Link
                  href="/">
                  <div className="aspect-square size-8 rounded-sm text-sidebar-primary-foreground grid place-items-center bg-primary relative">
                    <InfinityIcon className="size-4" />
                  </div>

                  <div className="min-w-0 group-data-[collapsible=icon]:hidden">
                    <h2 className="truncate font-semibold tracking-tight">
                      Chrona
                    </h2>
                    <p className="truncate text-xs text-muted-foreground">
                      Time made fun
                    </p>
                  </div>
                </Link>
              } />
            </SidebarMenuItem>
        </SidebarMenu>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={pathname === item.href}
                    onClick={handleItemClick}
                    render={
                      <Link href={item.href}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    }
                  >
                    
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={"Settings"}
              className="cursor-pointer">
              <Settings/>
              Settings
              <Badge 
                variant={"secondary"}
                className="ml-auto">Coming soon</Badge>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}