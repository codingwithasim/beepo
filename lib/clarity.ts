export type ClarityEvent =
  | "timer_started"
  | "timer_completed"
  | "stopwatch_started"
  | "stopwatch_lap_added"
  | "pomodoro_started"
  | "pomodoro_completed"
  | "world_clock_city_added"
  | "alarm_created"
  | "alarm_triggered"
  | "feedback_submitted";

declare global {
  interface Window {
    clarity?: (
      command: string,
      ...args: unknown[]
    ) => void;
  }
}

export function trackClarityEvent(
  event: ClarityEvent
) {
  if (
    typeof window === "undefined"
  ) {
    return;
  }

  window.clarity?.(
    "event",
    event
  );
}