"use client";

import { useUIStore } from "../stores/ui-store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Timer, Coffee, RefreshCcw } from "lucide-react";

export function PomodoroControls() {
  // You will wire these later in your pomodoro hook/store
  const pomodoroActions = useUIStore((s) => s.pomodoroActions);

  const mode = useUIStore((s) => s.pomodoroState?.mode);

  return (
    <div className="flex h-full flex-col space-y-6">
      {/* HEADER */}
      <div className="space-y-1">
        <h3 className="text-sm font-medium">Pomodoro</h3>
        <p className="text-xs text-muted-foreground">
          Focus session controls & cycles
        </p>
      </div>

      <Separator />

      {/* MODE SWITCH */}
      <div className="space-y-2">
        <p className="text-xs tracking-wider text-muted-foreground">
          MODE
        </p>

        <div className="grid gap-2">
          <Button
            variant={mode === "focus" ? "secondary" : "outline"}
            className="justify-start gap-2"
            onClick={() => pomodoroActions?.setMode?.("focus")}
          >
            <Timer className="h-4 w-4" />
            Focus Session
          </Button>

          <Button
            variant={mode === "shortBreak" ? "secondary" : "outline"}
            className="justify-start gap-2"
            onClick={() => pomodoroActions?.setMode?.("shortBreak")}
          >
            <Coffee className="h-4 w-4" />
            Short Break
          </Button>

          <Button
            variant={mode === "longBreak" ? "secondary" : "outline"}
            className="justify-start gap-2"
            onClick={() => pomodoroActions?.setMode?.("longBreak")}
          >
            <Coffee className="h-4 w-4" />
            Long Break
          </Button>
        </div>
      </div>

      <Separator />

      {/* SESSION CONTROLS */}
      <div className="space-y-2">
        <p className="text-xs tracking-wider text-muted-foreground">
          SESSION
        </p>

        <div className="grid gap-2">
          <Button
            variant="ghost"
            className="justify-start gap-2"
            onClick={() => pomodoroActions?.reset?.()}
          >
            <RefreshCcw className="h-4 w-4" />
            Reset Session
          </Button>
        </div>
      </div>

      {/* FOOTER INFO */}
      <div className="mt-auto text-xs text-muted-foreground">
        Tip: 25min focus → 5min break → repeat
      </div>
    </div>
  );
}