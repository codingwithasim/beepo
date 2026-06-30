import {
  AlarmClock,
  Clock3,
  Globe2,
  Settings,
  Timer,
  TimerReset,
} from "lucide-react";

import type { Tool } from "@/stores/ui-store";

export const navigation: {
  title: string;
  icon: any;
  tool: Tool;
}[] = [
  {
    title: "Timer",
    icon: Timer,
    tool: "timer",
  },
  {
    title: "Stopwatch",
    icon: TimerReset,
    tool: "stopwatch",
  },
  {
    title: "Pomodoro",
    icon: Clock3,
    tool: "pomodoro",
  },
  {
    title: "World Clock",
    icon: Globe2,
    tool: "world-clock",
  },
  {
    title: "Alarms",
    icon: AlarmClock,
    tool: "alarms",
  },
];

export const bottomNavigation = [
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];