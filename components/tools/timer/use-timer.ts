"use client";

import { useEffect, useRef, useState } from "react";
import { playAlarm } from "@/lib/play-alarm";

export type TimerStatus = "idle" | "running" | "paused" | "finished";

export function useTimer(initialSeconds: number) {
  const [duration, setDuration] = useState(initialSeconds);
  const [remaining, setRemaining] = useState(initialSeconds);
  const [status, setStatus] = useState<TimerStatus>("idle");

  const endTimeRef = useRef<number | null>(null);

  // ---------------------------
  // TIMER ENGINE
  // ---------------------------
  useEffect(() => {
    if (status !== "running") return;

    const interval = setInterval(() => {
      if (!endTimeRef.current) return;

      const secondsLeft = Math.max(
        0,
        Math.ceil((endTimeRef.current - Date.now()) / 1000)
      );

      setRemaining(secondsLeft);

      if (secondsLeft === 0) {
        setStatus("finished");
        endTimeRef.current = null;
        clearInterval(interval);
        playAlarm()
      }
    }, 250);

    return () => clearInterval(interval);
  }, [status]);

  // ---------------------------
  // ACTIONS
  // ---------------------------
  function start() {
    if (status === "running") return;

    const base = remaining > 0 ? remaining : duration;

    endTimeRef.current = Date.now() + base * 1000;
    setRemaining(base);
    setStatus("running");
  }

  function pause() {
    if (status !== "running") return;

    const secondsLeft = Math.max(
      0,
      Math.ceil((endTimeRef.current! - Date.now()) / 1000)
    );

    setRemaining(secondsLeft);
    endTimeRef.current = null;
    setStatus("paused");
  }

  function reset() {
    endTimeRef.current = null;
    setRemaining(duration);
    setStatus("idle");
  }

  function changeDuration(seconds: number) {
    endTimeRef.current = null;
    setDuration(seconds);
    setRemaining(seconds);
    setStatus("idle");
  }

  function addTime(seconds: number) {
    // always update duration baseline
    setDuration((prev) => prev + seconds);

    // if timer is running → adjust endTime (CRITICAL FIX)
    if (status === "running" && endTimeRef.current) {
      endTimeRef.current += seconds * 1000;
    }

    // update remaining visually immediately
    setRemaining((prev) => prev + seconds);
  }

  // ---------------------------
  // KEYBOARD SHORTCUTS
  // ---------------------------
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.code === "Space") {
        e.preventDefault();

        if (status === "running") {
          pause();
        } else {
          start();
        }
      }

      if (e.key.toLowerCase() === "r") {
        reset();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [status, remaining]);

  return {
    duration,
    remaining,
    status,

    start,
    pause,
    reset,
    changeDuration,
    addTime
  };
}