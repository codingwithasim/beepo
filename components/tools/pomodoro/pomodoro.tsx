"use client";

import { Card, CardContent } from "@/components/ui/card";
import { usePomodoro } from "./use-pomodoro";
import { PomodoroDisplay } from "./pomodoro-display";
import { PomodoroControls } from "./pomodoro-controls";

export function PomodoroTool() {
  const p = usePomodoro();

  return (
    <div className="flex h-full items-center justify-center">
      <Card className="w-full max-w-4xl ring-0 rounded-3xl shadow-none">
        <CardContent className="flex flex-col items-center gap-10 py-16">
          <PomodoroDisplay
            remaining={p.timeLeft}
            phase={p.mode}
            session={p.cycle}
          />

          <PomodoroControls
            isRunning={p.isRunning}
            start={p.start}
            pause={p.pause}
            reset={p.reset}
            setMode={p.setMode}
          />
        </CardContent>
      </Card>
    </div>
  );
}