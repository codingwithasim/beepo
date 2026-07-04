"use client";

import { usePathname } from "next/navigation";

import { StopwatchActions } from "./stopwatch-actions";
import { TimerPresets } from "./timer-presets";
import { PomodoroControls } from "./pomodoro-controls";

export function RightPanel() {
  const pathname = usePathname();

  if (pathname === "/world-clock") return null;
  if (pathname === "/alarms") return null;

  return (
    <aside className="flex h-full w-96 shrink-0 flex-col border-l bg-background p-4">
      <h2 className="mb-4 text-sm font-medium text-muted-foreground">
        Controls
      </h2>

      {pathname === "/timer" && <TimerPresets />}
      {pathname === "/stopwatch" && <StopwatchActions />}
      {pathname === "/pomodoro" && <PomodoroControls />}
    </aside>
  );
}