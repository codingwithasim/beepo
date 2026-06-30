"use client";

import { TopBar } from "./header/top-bar";
import { RightPanel } from "./panels/right-panel";
import { AppSidebar } from "./sidebar/app-sidebar";
import { Workspace } from "./workspace/workspace";


export function AppShell() {
  return (
    <div className="flex w-full h-screen overflow-hidden bg-background">
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