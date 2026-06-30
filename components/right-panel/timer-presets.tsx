"use client";

import { Button } from "@/components/ui/button";
import { useUIStore } from "../stores/ui-store";

const presets = [
  { label: "5 min", value: 5 * 60 },
  { label: "10 min", value: 10 * 60 },
  { label: "25 min", value: 25 * 60 },
  { label: "45 min", value: 45 * 60 },
  { label: "60 min", value: 60 * 60 },
];

export function TimerPresets() {
  const timerActions = useUIStore((s) => s.timerActions);

  return (
    <div className="space-y-3">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">
        Presets
      </p>

      <div className="flex flex-col gap-2">
        {presets.map((p) => (
          <Button
            key={p.value}
            variant="outline"
            onClick={() => timerActions?.setDuration?.(p.value)}
          >
            {p.label}
          </Button>
        ))}
      </div>

      <div className="pt-4 space-y-2">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          Quick Actions
        </p>

        <Button
          variant="secondary"
          onClick={() => timerActions?.addTime?.(30)}
        >
          +30 sec
        </Button>

        <Button
          variant="secondary"
          onClick={() => timerActions?.addTime?.(60)}
        >
          +1 min
        </Button>
      </div>
    </div>
  );
}