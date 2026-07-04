import { Tool } from "@/components/stores/ui-store";
import {
  AlarmClock,
  Clock3,
  Globe2,
  Settings,
  Timer,
  TimerReset,
} from "lucide-react";


export const navigation = [
  {
    title: "Timer",
    icon: Timer,
    href: "/timer",
  },
  {
    title: "Stopwatch",
    icon: TimerReset,
    href: "/stopwatch",
  },
  {
    title: "Pomodoro",
    icon: Clock3,
    href: "/pomodoro",
  },
  {
    title: "World Clock",
    icon: Globe2,
    href: "/world-clock",
  },
  {
    title: "Alarms",
    icon: AlarmClock,
    href: "/alarms",
  },
];

export const bottomNavigation = [
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];