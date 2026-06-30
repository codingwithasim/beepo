"use client";

import { TopBar } from "./header/top-bar";
import { AppSidebar } from "./sidebar/app-sidebar";
import { Workspace } from "./workspace/workspace";
import { RightPanel } from "@/components/right-panel/right-panel";


export function AppShell() {
  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* Left Sidebar */}
      <AppSidebar />

      {/* Main Area */}
      <main className="flex flex-1 flex-col overflow-hidden">
        <TopBar />

        <Workspace />
      </main>

      {/* Right Context Panel */}
      <RightPanel />
    </div>
  );
}