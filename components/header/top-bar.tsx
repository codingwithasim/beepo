"use client";

import { useEffect, useState } from "react";
import {
  Clock3,
  Menu,
  Moon,
  Sun,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { MobileRightPanel } from "../right-panel/mobile-right-panel";

const toolLabels: Record<string, string> = {
  "/timer": "Timer",
  "/stopwatch": "Stopwatch",
  "/pomodoro": "Pomodoro",
  "/world-clock": "World Clock",
  "/alarms": "Alarms",
  "/feedback": "Feedback",
};

export function TopBar() {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();
  const { resolvedTheme, setTheme } = useTheme();

  const [currentTime, setCurrentTime] = useState("");
  const [is24Hour, setIs24Hour] = useState(false);

  const currentToolLabel =
    toolLabels[pathname] ?? "Chrona";

  useEffect(() => {
    function updateTime() {
      setCurrentTime(
        new Date().toLocaleTimeString([], {
          hour: is24Hour ? "2-digit" : "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: !is24Hour,
        })
      );
    }

    updateTime();

    const intervalId = window.setInterval(
      updateTime,
      1000
    );

    return () => {
      window.clearInterval(intervalId);
    };
  }, [is24Hour]);

  function toggleTheme() {
    setTheme(
      resolvedTheme === "dark"
        ? "light"
        : "dark"
    );
  }

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-2 sm:px-4">
      {/* Left */}
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className="shrink-0"
        >
          <Menu className="size-5" />
        </Button>

        <Separator
          orientation="vertical"
          className="hidden h-6 sm:block"
        />

        <h1 className="truncate text-sm font-medium">
          {currentToolLabel}
        </h1>
      </div>

      {/* Right */}
      <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
        <span className="hidden min-w-[88px] text-right text-sm tabular-nums sm:inline">
          {currentTime}
        </span>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() =>
                  setIs24Hour((value) => !value)
                }
                aria-label={
                  is24Hour
                    ? "Switch to 12-hour time"
                    : "Switch to 24-hour time"
                }
              >
                <Clock3 className="size-5" />
              </Button>
            }
          />

          <TooltipContent>
            <p>
              {is24Hour
                ? "Switch to 12-hour time"
                : "Switch to 24-hour time"}
            </p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label={
                  resolvedTheme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="size-5" />
                ) : (
                  <Moon className="size-5" />
                )}
              </Button>
            }
          />

          <TooltipContent>
            <p>
              {resolvedTheme === "dark"
                ? "Light mode"
                : "Dark mode"}
            </p>
          </TooltipContent>
        </Tooltip>

        <MobileRightPanel />
      </div>
    </header>
  );
}