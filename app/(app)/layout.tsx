// app/(app)/layout.tsx

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { TopBar } from "@/components/header/top-bar";
import { RightPanel } from "@/components/right-panel/right-panel";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen">
      <AppSidebar />

      <div className="flex flex-1">
        {/* Main content */}
        <main className="flex min-w-0 flex-1 flex-col">
          <TopBar />

          <div className="flex-1 overflow-auto p-6">
            {children}
          </div>
        </main>

        {/* Right panel */}
        <RightPanel />
      </div>
    </div>
  );
}