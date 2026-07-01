"use client";

import { Card, CardContent } from "@/components/ui/card";

import { usePomodoro } from "./use-pomodoro";
import { PomodoroDisplay } from "./pomodoro-display";
import { PomodoroControls } from "./pomodoro-controls";

export function PomodoroTool() {
  const p = usePomodoro();

  return (
    <div className="flex h-full items-center justify-center">
      <Card className="w-full ring-0 shadow-none max-w-4xl rounded-3xl">
        <CardContent className="flex flex-col items-center gap-10 py-16">

          <PomodoroDisplay
            remaining={p.remaining}
            phase={p.phase}
            session={p.session}
          />

          <PomodoroControls
            status={p.status}
            start={p.start}
            pause={p.pause}
            reset={p.reset}
          />
        </CardContent>
      </Card>
    </div>
  );
}