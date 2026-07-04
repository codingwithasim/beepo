"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LucidePen, LucideTrash } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type TimezoneCardProps = {
  city: string;
  country: string;
  time: string;
  date: string;
  offset: string | null;
  gmt?: string;

  timezone: string;

  onEdit?: () => void;
  onDelete?: () => void;
};

const TOTAL_MINUTES = 24 * 60;

function parseTimeToMinutes(timeStr: string) {
  const [time, meridiem] = timeStr.split(" ");
  let [h, m] = time.split(":").map(Number);

  if (meridiem === "PM" && h !== 12) h += 12;
  if (meridiem === "AM" && h === 12) h = 0;

  return h * 60 + m;
}

function minutesToTime(mins: number) {
  mins = ((mins % TOTAL_MINUTES) + TOTAL_MINUTES) % TOTAL_MINUTES;

  const h24 = Math.floor(mins / 60);
  const m = mins % 60;

  const meridiem = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;

  return {
    hour: String(h12).padStart(2, "0"),
    minute: String(m).padStart(2, "0"),
    meridiem,
  };
}

export function TimezoneCard({
  city,
  country,
  time,
  date,
  offset,
  gmt = "GMT+0",
  onEdit,
  onDelete,
}: TimezoneCardProps) {
  const initialMinutes = useMemo(() => parseTimeToMinutes(time), [time]);

  const [minutes, setMinutes] = useState(initialMinutes);
  const draggingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const displayTime = useMemo(() => minutesToTime(minutes), [minutes]);

  const ticks = Math.floor(TOTAL_MINUTES / 15);

  function updateFromClientX(clientX: number) {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const percent = x / rect.width;

    setMinutes(Math.round(percent * TOTAL_MINUTES));
  }

  const sliderPercent = (minutes / TOTAL_MINUTES) * 100;

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!draggingRef.current) return;
      updateFromClientX(e.clientX);
    }

    function onUp() {
      draggingRef.current = false;
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <Card className="relative w-full max-w-md overflow-hidden rounded-xl border bg-background text-foreground">
      <CardContent className="space-y-3 p-4 sm:p-3">

        {/* header */}
        <div className="relative z-20 flex items-center justify-between gap-3">
          <p className="truncate text-base text-muted-foreground">
            {city}, {country}
          </p>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon-sm" onClick={onEdit}>
              <LucidePen />
            </Button>

            <Button variant="ghost" size="icon-sm" onClick={onDelete}>
              <LucideTrash />
            </Button>
          </div>
        </div>

        {/* time */}
        <div className="relative z-20 flex items-end gap-2">
          <p className="font-mono text-2xl">
            {displayTime.hour}:{displayTime.minute}{" "}
            <span className="text-sm text-muted-foreground">
              {displayTime.meridiem}
            </span>
          </p>

          {offset && (
            <span className="rounded-full bg-muted px-2 py-1 text-sm text-destructive">
              {offset}
            </span>
          )}
        </div>

        {/* GMT + date */}
        <div className="relative z-20 flex items-center gap-2 text-sm text-muted-foreground">
          <span>{gmt}</span>
          <span>·</span>
          <span>{date}</span>
        </div>

        {/* slider */}
        <div
          ref={containerRef}
          className="relative z-20 mt-6 select-none cursor-grab active:cursor-grabbing"
          onMouseDown={(e) => {
            draggingRef.current = true;
            updateFromClientX(e.clientX);
          }}
        >
          {/* bars */}
          <div className="flex h-3 w-full items-end gap-[2px]">
            {Array.from({ length: ticks }).map((_, i) => {
              const isMajor = i % 4 === 0;
              const isNoon = i === 24;

              return (
                <div
                  key={i}
                  className={[
                    "w-[2px]",
                    isNoon ? "bg-muted-foreground" : "bg-border",
                    isMajor ? "h-full" : "h-[60%]",
                  ].join(" ")}
                />
              );
            })}
          </div>

          {/* thumb */}
          <div
            className="absolute top-[-6px] flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background shadow-md"
            style={{
              left: `${sliderPercent}%`,
              transform: "translateX(-50%)",
            }}
          >
            ⇆
          </div>
        </div>
      </CardContent>
    </Card>
  );
}