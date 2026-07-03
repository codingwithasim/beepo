  "use client";

  import { useUIStore } from "../stores/ui-store";
  import { StopwatchActions } from "./stopwatch-actions";
  import { TimerPresets } from "./timer-presets";
  import { PomodoroControls } from "./pomodoro-controls";

  export function RightPanel() {
    const activeTool = useUIStore((s) => s.activeTool);

    if(activeTool === "world-clock") return

    return (
      <aside className="flex h-full w-96 flex-col border-l bg-background p-4">
        <h2 className="mb-4 text-sm font-medium text-muted-foreground">
          Controls
        </h2>

        {activeTool === "timer" && <TimerPresets />}
        {activeTool === "stopwatch" && <StopwatchActions />}
        {activeTool === "pomodoro" && <PomodoroControls />}

        {activeTool === "pomodoro" && (
          <p className="text-sm text-muted-foreground">
            Pomodoro controls coming soon
          </p>
        )}
      </aside>
    );
  }