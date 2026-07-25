"use client";

import {
  useEffect,
  useRef,
} from "react";

import { useAlarmStore } from "@/stores/alarms-store";

import {
  getCurrentMinutes,
  getTodayKey,
} from "./alarm-utils";

const SOUND_URL =
  "/sounds/aud_01.wav";

export function useAlarmChecker() {
  const audioRef =
    useRef<HTMLAudioElement | null>(
      null
    );

  useEffect(() => {
    const audio =
      new Audio(SOUND_URL);

    audio.loop = false;
    audio.preload = "auto";

    audioRef.current = audio;

    function checkAlarms() {
      const date = new Date();

      const currentMinutes =
        getCurrentMinutes(date);

      const today =
        getTodayKey(date);

      const store =
        useAlarmStore.getState();

      const dueAlarms =
        store.alarms.filter(
          (alarm) =>
            alarm.enabled &&
            alarm.time ===
              currentMinutes &&
            alarm.lastTriggeredDate !==
              today
        );

      if (!dueAlarms.length) {
        return;
      }

      let shouldPlay = false;

      for (const alarm of dueAlarms) {
        const triggered =
          store.triggerAlarm(
            alarm.id,
            today
          );

        if (triggered) {
          shouldPlay = true;
        }
      }

      if (!shouldPlay) {
        return;
      }

      audio.pause();
      audio.currentTime = 0;

      void audio.play().catch(() => {
        // Playback may be blocked until
        // the user interacts with the page.
      });
    }

    const intervalId =
      window.setInterval(
        checkAlarms,
        1000
      );

    return () => {
      window.clearInterval(
        intervalId
      );

      audio.pause();
      audio.currentTime = 0;
      audio.src = "";

      audioRef.current = null;
    };
  }, []);
}