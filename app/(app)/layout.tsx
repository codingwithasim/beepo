import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { TopBar } from "@/components/header/top-bar";

import { RightPanel } from "@/components/right-panel/right-panel";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-dvh w-full overflow-hidden bg-background">
      <AppSidebar />

      <div className="flex min-w-0 flex-1 overflow-hidden">
        {/* Main content */}
        <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <TopBar/>

          <div
            className="
              min-h-0
              flex-1
              overflow-y-auto
              overscroll-contain
              px-4
              py-4
              sm:px-6
              sm:py-6
            "
          >
            {children}
          </div>
        </main>

        {/* Desktop right panel */}
        <RightPanel className="hidden lg:flex" />
      </div>
    </div>
  );
}