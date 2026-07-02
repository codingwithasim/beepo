"use client";

import { Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUIStore } from "../stores/ui-store";
import { AnimatePresence, motion } from "framer-motion";

type Lap = {
  id: number;
  split: number;
  total: number;
};


function format(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const msPart = Math.floor((ms % 1000) / 10);

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}.${String(msPart).padStart(2, "0")}`;
}

export function StopwatchActions() {

  const laps = useUIStore((s) => s.stopwatchLaps);

  const clearLaps = useUIStore(
    (s) => s.stopwatchActions?.clearLaps
  );

  return (
  <div className="flex h-full flex-col">
    {/* LAPS */}
    <div className="flex min-h-0 flex-1 flex-col space-y-3">
      <p className="flex items-center gap-2 text-xs tracking-wider text-muted-foreground">
        <Flag size={16} />
        Laps
      </p>

      <div className="grid grid-cols-3 px-3 pt-4 text-xs text-muted-foreground">
        <span>Lap</span>
        <span className="text-center">Lap Time</span>
        <span className="text-right">Total</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {laps.length === 0 ? (
          <div className="flex flex-1 py-12 space-y-4 flex-col items-center justify-center text-center text-muted-foreground">
            <Flag className="mb-3 h-10 w-10 opacity-30" />

            <p className="text-sm font-medium">No laps yet</p>
            <p className="text-xs text-muted-foreground">
              Press <span className="bg-secondary px-2 py-1 rounded-sm">Lap</span> while the stopwatch is running
            </p>
          </div>
        ) : (
          <div className="group space-y-1 animate-fade-in">
            <AnimatePresence initial={false}>
              {laps.map((lap) => (
                <motion.div
                  layout
                  key={lap.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18,  }}
                  className="grid grid-cols-3 items-center rounded-lg px-3 py-3 transition-colors group-hover:not-[:hover]:text-black/50"
                >
                  <span className="text-sm text-muted-foreground">
                    #{lap.id}
                  </span>

                  <span className="text-center font-mono text-sm">
                    {format(lap.split)}
                  </span>

                  <span className="text-right font-mono text-sm">
                    {format(lap.total)}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>

    {/* ACTION */}
    <Button
      variant="ghost"
      className="mt-4 w-full shrink-0"
      disabled={laps.length === 0}
      onClick={() => clearLaps?.()}
    >
      Clear Laps
    </Button>
  </div>
);
}