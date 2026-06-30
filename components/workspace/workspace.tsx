"use client";

import { useUIStore } from "../stores/ui-store";
import { StopwatchTool } from "../tools/stopwatch/stopwatch";
import { TimerTool } from "../tools/timer/timer";


export function Workspace() {
  const activeTool = useUIStore((s) => s.activeTool);

  return (
    <main className="flex-1 w-96 bg-amber-800 overflow-auto bg-muted/20 p-6">
      <div className="mx-auto h-full max-w-6xl">
        {activeTool === "timer" && <TimerTool />}
        {activeTool === "stopwatch" && <StopwatchTool />}
        {activeTool === "pomodoro" && <PomodoroTool />}
        {activeTool === "world-clock" && <WorldClockTool />}
        {activeTool === "alarms" && <AlarmsTool />}
      </div>
    </main>
  );
}