"use client";

import { useEffect, useRef, useState } from "react";
import { useUIStore } from "@/components/stores/ui-store";
import { playAlarm } from "@/lib/play-alarm";

type Status = "idle" | "running" | "paused";

type Lap = {
  id: number;
  split: number;
  total: number;
};

export function useStopwatch() {
  const [elapsed, setElapsed] = useState(0);
  const [status, setStatus] = useState<Status>("idle");

  const startTimeRef = useRef<number | null>(null);
  const pausedAtRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [laps, setLaps] = useState<Lap[]>([]);
  const lastLapRef = useRef(0);

  const setStopwatchLaps = useUIStore(
    (s) => s.setStopwatchLaps
  );

  const setStopwatchActions = useUIStore(
    (s) => s.setStopwatchActions
  );

  function lap() {
    if (status !== "running") return;

    const split = elapsed - lastLapRef.current;

    lastLapRef.current = elapsed;

    setLaps((prev) => [
      {
        id: prev.length + 1,
        split,
        total: elapsed,
      },
      ...prev,
    ]);
  }

  function start() {
    if (status === "running") return;

    startTimeRef.current = Date.now() - pausedAtRef.current;

    setStatus("running");

    intervalRef.current = setInterval(() => {
      if (!startTimeRef.current) return;

      setElapsed(Date.now() - startTimeRef.current);
    }, 100);
  }

  function pause() {
    if (status !== "running") return;

    setStatus("paused");

    if (intervalRef.current) clearInterval(intervalRef.current);

    pausedAtRef.current = elapsed;
  }

  function reset() {
    if (intervalRef.current) clearInterval(intervalRef.current);

    setElapsed(0);
    setStatus("idle");
    startTimeRef.current = null;
    pausedAtRef.current = 0;

    lastLapRef.current = 0;
    setLaps([]);
  }

  function clearLaps() {
    lastLapRef.current = elapsed;
    setLaps([]);
  }

  useEffect(() => {
    setStopwatchLaps(laps);
  }, [laps, setStopwatchLaps]);

  useEffect(() => {
    setStopwatchActions({
      lap,
      clearLaps,
    });

    return () => setStopwatchActions(undefined);
  }, []);

  return {
    elapsed,
    status,
    start,
    pause,
    reset,
    lap,
    clearLaps,
    laps
  };
}