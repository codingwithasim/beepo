"use client";

import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useSidebar } from "@/components/ui/sidebar";
import { useUIStore } from "../stores/ui-store";

const toolLabels: Record<string, string> = {
  timer: "Timer",
  stopwatch: "Stopwatch",
  pomodoro: "Pomodoro",
  "world-clock": "World Clock",
  alarms: "Alarms",
};

export function TopBar() {
  const { toggleSidebar } = useSidebar();
  const activeTool = useUIStore((s) => s.activeTool);

  return (
    <header className="flex h-14 items-center justify-between border-b px-4">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <Separator orientation="vertical" className="h-6" />

        <h1 className="text-sm font-medium">
          {toolLabels[activeTool]}
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
        </Button>

        {/* Placeholder for theme toggle */}
        <Button variant="ghost" size="icon">
          🌙
        </Button>
      </div>
    </header>
  );
}