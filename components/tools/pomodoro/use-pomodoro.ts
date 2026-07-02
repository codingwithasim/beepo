"use client";

import { useEffect, useRef, useState } from "react";
import { useUIStore } from "@/components/stores/ui-store";

type Mode = "focus" | "shortBreak" | "longBreak";

const CONFIG = {
  focus: 2 * 1,
  shortBreak: 5 * 1,
  longBreak: 3 * 2,
  cyclesBeforeLongBreak: 4,
};

export function usePomodoro() {
  const [mode, setMode] = useState<Mode>("focus");
  const [timeLeft, setTimeLeft] = useState(CONFIG.focus);
  const [isRunning, setIsRunning] = useState(false);
  const [cycle, setCycle] = useState(1);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const setPomodoroState = useUIStore(
    (s) => s.setPomodoroState
  );

  useEffect(() => {
  setPomodoroState({
    mode,
    timeLeft,
    isRunning,
    cycle,
  });
}, [
  mode,
  timeLeft,
  isRunning,
  cycle,
  setPomodoroState,
]);

  function getDuration(m: Mode) {
    return CONFIG[m];
  }

  function clear() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function start() {
    if (isRunning) return;

    setIsRunning(true);
    clear();

    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
  }

  useEffect(() => {
  if (!isRunning) return;

  if (timeLeft > 0) return;

  next();
}, [timeLeft]);

  function pause() {
    setIsRunning(false);
    clear();
  }

  function reset() {
    pause();
    setMode("focus");
    setCycle(1);
    setTimeLeft(CONFIG.focus);
  }

  function setModeSafe(next: Mode) {
    pause();
    setMode(next);
    setTimeLeft(getDuration(next));
  }

  function next() {
  if (mode !== "focus") {
    setMode("focus");
    setTimeLeft(CONFIG.focus);
    return;
  }

  const isLong =
    cycle % CONFIG.cyclesBeforeLongBreak === 0;

  const nextMode = isLong ? "longBreak" : "shortBreak";

  setMode(nextMode);
  setTimeLeft(CONFIG[nextMode]);

  // Always increment after a focus session
  setCycle((c) => c + 1);
}

  useEffect(() => {
    return () => clear();
  }, []);

  return {
    mode,
    timeLeft,
    isRunning,
    cycle,
    start,
    pause,
    reset,
    setMode: setModeSafe,
  };
}