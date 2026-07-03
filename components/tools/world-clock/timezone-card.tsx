"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LucidePen, LucideTrash } from "lucide-react";
import { useState } from "react";

type TimezoneCardProps = {
  city: string;
  country: string;
  time: string;
  date: string;
  offset: string | null;
  gmt?: string;

  onEdit?: () => void;
  onDelete?: () => void;
};

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
  const [value, setValue] = useState(55);
  const [dragging, setDragging] = useState(false);

  const [hour, minute, meridiem] = time.split(/[: ]/);

  

  function updateFromClientX(clientX: number, rect: DOMRect) {
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const percent = (x / rect.width) * 100;
    setValue(percent);
  }

  const TICK_INTERVAL_MINUTES = 15;
  const TOTAL_MINUTES = 24 * 60;

  const ticks = Math.floor(TOTAL_MINUTES / TICK_INTERVAL_MINUTES);

  return (
    <Card className="relative w-full max-w-md overflow-hidden rounded-xl border h-full bg-background text-foreground">
      <CardContent className="space-y-2 p-4 sm:p-3">
        {/* drag overlay */}
        <div
          title={city}
          className="absolute inset-0 z-10 cursor-grab select-none"
        />

        {/* header */}
        <div className="relative z-20 flex items-center justify-between gap-3">
          <p className="min-w-0 truncate text-base text-muted-foreground">
            {city}, {country}
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon-sm"
              className="cursor-pointer text-muted-foreground hover:text-foreground"
              onClick={onEdit}
            >
              <LucidePen />
            </Button>

            <Button
              variant="ghost"
              size="icon-sm"
              className="cursor-pointer text-muted-foreground hover:text-destructive"
              onClick={onDelete}
            >
              <LucideTrash />
            </Button>
          </div>
        </div>

        {/* time */}
        <div className="relative z-20 flex items-end justify-between">
          <div className="flex items-end gap-2">
            <p className="font-mono text-2xl tabular-nums sm:text-3xl">
              {hour}:{minute}
              <span className="ml-2 text-sm font-medium text-muted-foreground">
                {meridiem}
              </span>
            </p>

            {
              offset && <span className="rounded-full bg-muted px-2 py-1 text-sm text-destructive">
              {offset}
            </span>
            }
          </div>
        </div>

        {/* GMT + date */}
        <div className="relative z-20 flex items-center gap-2 text-sm text-muted-foreground">
          <span>{gmt}</span>
          <span>·</span>
          <button className="border-b border-dashed border-muted-foreground hover:text-foreground">
            {date}
          </button>
        </div>

        {/* slider */}
        <div
          className="relative z-20 mt-6 select-none"
          onMouseDown={(e) => {
            setDragging(true);
            const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
            updateFromClientX(e.clientX, rect);
          }}
          onMouseMove={(e) => {
            if (!dragging) return;
            const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
            updateFromClientX(e.clientX, rect);
          }}
          onMouseUp={() => setDragging(false)}
          onMouseLeave={() => setDragging(false)}
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

          {/* labels */}
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>00</span>
            <span>06</span>
            <span>12</span>
            <span>18</span>
            <span>24</span>
          </div>

          {/* thumb */}
          <div
            className="absolute top-[-6px] flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background shadow-md"
            style={{ left: `${value}%`, transform: "translateX(-50%)" }}
          >
            ⇆
          </div>
        </div>
      </CardContent>
    </Card>
  );
}