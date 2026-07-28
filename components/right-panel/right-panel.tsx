"use client";

import { usePathname } from "next/navigation";

import { StopwatchActions } from "./stopwatch-actions";
import { TimerPresets } from "./timer-presets";
import { PomodoroControls } from "./pomodoro-controls";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type RightPanelProps = {
  className?: string;
};

type RightPanelConfig = {
  title: string;
  content: ReactNode;
};

export function useRightPanelConfig(): RightPanelConfig | null {
  const pathname = usePathname();

  switch (pathname) {
    case "/timer":
      return {
        title: "Timer Presets",
        content: <TimerPresets />,
      };

    case "/stopwatch":
      return {
        title: "Stopwatch Controls",
        content: <StopwatchActions />,
      };

    case "/pomodoro":
      return {
        title: "Pomodoro Controls",
        content: <PomodoroControls />,
      };

    default:
      return null;
  }
}

export function RightPanel({ className }: RightPanelProps) {
  const pathname = usePathname();

  if (pathname === "/world-clock") return null;
  if (pathname === "/alarms") return null;
  if (pathname === "/feedback") return null;

  return (
    <aside className={cn("flex h-full w-96 shrink-0 flex-col border-l bg-background p-4", className)}>
      <h2 className="mb-4 text-sm font-medium text-muted-foreground">
        Controls
      </h2>

      {pathname === "/timer" && <TimerPresets />}
      {pathname === "/stopwatch" && <StopwatchActions />}
      {pathname === "/pomodoro" && <PomodoroControls />}
    </aside>
  );
}