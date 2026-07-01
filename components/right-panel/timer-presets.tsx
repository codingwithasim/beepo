"use client";

import { Button } from "@/components/ui/button";
import { useUIStore } from "../stores/ui-store";
import { LucideComponent, LucideCross, LucideGauge, LucidePlus, X } from "lucide-react";

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
      <p className="text-xs flex gap-2 tracking-wider text-muted-foreground">
        <LucideComponent size={16}/>
        Presets
      </p>

      <Button
        variant={"ghost"}
        className="text-gray-600 w-full cursor-pointer">
          <LucidePlus/>
        Create new preset
      </Button>

      <div className="flex flex-wrap gap-2">
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

      <div className="pt-4 space-y-4 space-x-1">
        <p className="text-xs flex gap-2 items-center tracking-wider text-muted-foreground">
          <LucideGauge size={16}/>
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