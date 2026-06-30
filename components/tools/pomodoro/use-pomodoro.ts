"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "work" | "break";

type Status = "idle" | "running" | "paused";

export function usePomodoro() {
  const WORK_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;

  const [phase, setPhase] = useState<Phase>("work");
  const [remaining, setRemaining] = useState(WORK_TIME);
  const [status, setStatus] = useState<Status>("idle");
  const [session, setSession] = useState(1);

  const endTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getPhaseTime = (p: Phase) =>
    p === "work" ? WORK_TIME : BREAK_TIME;

  function start() {
    if (status === "running") return;

    const base = remaining;

    endTimeRef.current = Date.now() + base * 1000;
    setStatus("running");

    intervalRef.current = setInterval(() => {
      if (!endTimeRef.current) return;

      const left = Math.max(
        0,
        Math.ceil((endTimeRef.current - Date.now()) / 1000)
      );

      setRemaining(left);

      if (left === 0) {
        // switch phase
        const nextPhase = phase === "work" ? "break" : "work";

        setPhase(nextPhase);
        setRemaining(getPhaseTime(nextPhase));

        if (nextPhase === "work") {
          setSession((s) => s + 1);
        }

        endTimeRef.current = Date.now() + getPhaseTime(nextPhase) * 1000;
      }
    }, 250);
  }

  function pause() {
    if (intervalRef.current) clearInterval(intervalRef.current);

    setStatus("paused");

    if (endTimeRef.current) {
      setRemaining(
        Math.ceil((endTimeRef.current - Date.now()) / 1000)
      );
    }

    endTimeRef.current = null;
  }

  function reset() {
    if (intervalRef.current) clearInterval(intervalRef.current);

    setPhase("work");
    setRemaining(WORK_TIME);
    setStatus("idle");
    setSession(1);
    endTimeRef.current = null;
  }

  return {
    phase,
    remaining,
    status,
    session,

    start,
    pause,
    reset,
  };
}