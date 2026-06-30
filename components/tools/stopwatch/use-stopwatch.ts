"use client";

import { useEffect, useRef, useState } from "react";

type Status = "idle" | "running" | "paused";

export function useStopwatch() {
  const [elapsed, setElapsed] = useState(0);
  const [status, setStatus] = useState<Status>("idle");

  const startTimeRef = useRef<number | null>(null);
  const pausedAtRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
  }

  return {
    elapsed,
    status,
    start,
    pause,
    reset,
  };
}