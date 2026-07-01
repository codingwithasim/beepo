"use client";

import { useEffect, useState } from "react";
import { LucideMoon, Menu, Clock3 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { useUIStore } from "../stores/ui-store";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const toolLabels: Record<string, string> = {
  timer: "Timer",
  stopwatch: "Stopwatch",
  pomodoro: "Pomodoro",
  "world-clock": "World Clock",
  alarms: "Alarms",
};

export function TopBar() {
  const { toggleSidebar } = useSidebar();
  const activeTool = useUIStore((s) => s.activeTool);

  const [currentTime, setCurrentTime] = useState("");
  const [is24Hour, setIs24Hour] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: !is24Hour,
        })
      );
    };

    updateTime(); // Set immediately on mount

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [is24Hour]);

  return (
    <header className="flex h-14 items-center justify-between border-b px-4">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>

        <Separator orientation="vertical" className="h-6" />

        <h1 className="text-sm font-medium">
          {toolLabels[activeTool]}
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">
        <span className="text-sm tabular-nums">
          {currentTime}
        </span>

        

        <Tooltip>
          <TooltipTrigger render={
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIs24Hour((v) => !v)}
            >
              <Clock3 className="h-5 w-5" />
            </Button>
          }>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {
                is24Hour ? "Switch to 12-hour time" : "Switch to 24-hour time"
              }
            </p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger render={
            <Button variant="ghost" size="icon">
              <LucideMoon className="h-5 w-5" />
            </Button>
          }>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Dark mode
            </p>
          </TooltipContent>
        </Tooltip>

      </div>
    </header>
  );
}