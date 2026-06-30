"use client";

import { useUIStore } from "../stores/ui-store";
import { PomodoroTool } from "../tools/pomodoro/pomodoro";
import { StopwatchTool } from "../tools/stopwatch/stopwatch";
import { TimerTool } from "../tools/timer/timer";
import { WorldClockTool } from "../tools/world-clock/world-clock";


export function Workspace() {
  const activeTool = useUIStore((s) => s.activeTool);

  return (
    <main className="flex-1 w-full overflow-auto bg-muted/20 p-6">
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