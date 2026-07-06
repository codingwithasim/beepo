"use client";

import { useState } from "react";
import { Clock3, Gauge, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTimerStore } from "@/stores/timer-store";

export function TimerPresets() {
  const { actions, presets, addPreset } = useTimerStore();

  const [creating, setCreating] = useState(false);
  const [label, setLabel] = useState("");
  const [minutes, setMinutes] = useState(5);

  const handleSave = () => {
    const trimmed = label.trim();

    if (!trimmed || minutes <= 0) return;

    addPreset({
      id: crypto.randomUUID(),
      label: trimmed,
      duration: minutes * 60,
    });

    setLabel("");
    setMinutes(5);
    setCreating(false);
  };

  return (
    <div className="space-y-3">
      <p className="flex items-center gap-2 text-xs tracking-wider text-muted-foreground">
        <Clock3 size={16} />
        Presets
      </p>

      <Button
        variant="ghost"
        className="w-full cursor-pointer text-muted-foreground"
        onClick={() => setCreating((v) => !v)}
      >
        <Plus />
        Create new preset
      </Button>

      {creating && (
        <div className="space-y-3 rounded-lg border p-3">
          <Input
            placeholder="Preset name"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />

          <Input
            type="number"
            min={1}
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
          />

          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              onClick={() => setCreating(false)}
            >
              Cancel
            </Button>

            <Button onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <Button
            key={preset.id}
            variant="outline"
            onClick={() => actions?.setDuration?.(preset.duration)}
          >
            {preset.label}
          </Button>
        ))}
      </div>

      <div className="space-y-4 space-x-1 pt-4">
        <p className="flex items-center gap-2 text-xs tracking-wider text-muted-foreground">
          <Gauge size={16} />
          Quick Actions
        </p>

        <Button
          variant="secondary"
          onClick={() => actions?.addTime?.(30)}
        >
          +30 sec
        </Button>

        <Button
          variant="secondary"
          onClick={() => actions?.addTime?.(60)}
        >
          +1 min
        </Button>
      </div>
    </div>
  );
}