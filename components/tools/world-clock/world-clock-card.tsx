"use client";

import { useEffect, useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Props = {
  name: string;
  countryCode: string;
  timezone: string;
  time: string;
  diff?: string | null;
  onRemove: () => void;
};

export function WorldClockCard({
  name,
  countryCode,
  timezone,
  time,
  diff,
  onRemove,
}: Props) {
  const [dragging, setDragging] = useState(false);
  const [value, setValue] = useState(50);

  const sliderRef = useRef<HTMLDivElement | null>(null);

  const [hour, minute, meridiem] = time.split(/[: ]/);

  const ticks = 96;

  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);

    setValue((x / rect.width) * 100);
  };

  useEffect(() => {
    if (!dragging) return;

    const onMove = (e: MouseEvent) => handleMove(e.clientX);
    const onUp = () => setDragging(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging]);

  return (
    <div className="relative w-full rounded-2xl border bg-background p-4 text-foreground shadow-sm">
      {/* drag overlay */}
      <div className="absolute inset-0 z-10 cursor-grab select-none" />

      {/* HEADER */}
      <div className="relative z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={`https://flagcdn.com/w40/${countryCode}.png`}
            className="h-5 w-7 rounded-sm"
          />

          <div>
            <p className="text-sm font-medium">{name}</p>
            <p className="text-xs text-muted-foreground">{timezone}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {diff && (
            <Badge variant="secondary" className="text-xs">
              {diff}
            </Badge>
          )}

          <button
            onClick={onRemove}
            className="text-muted-foreground hover:text-foreground"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* TIME */}
      <div className="relative z-20 mt-4 flex items-end justify-between">
        <p className="font-mono text-3xl tabular-nums sm:text-4xl">
          {hour}:{minute}{" "}
          <span className="text-sm text-muted-foreground">{meridiem}</span>
        </p>
      </div>

      {/* SLIDER */}
      <div
        ref={sliderRef}
        className={`relative z-20 mt-6 select-none ${
          dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseDown={(e) => {
          setDragging(true);
          handleMove(e.clientX);
        }}
      >
        {/* TICKS */}
        <div className="flex w-full items-end gap-[2px]">
          {Array.from({ length: ticks }).map((_, i) => {
            const isHour = i % 4 === 0;

            return (
              <div
                key={i}
                className={[
                  "flex-1 border-l",
                  isHour
                    ? "h-full border-muted-foreground"
                    : "h-[60%] border-border",
                ].join(" ")}
              />
            );
          })}
        </div>

        {/* LABELS */}
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>00</span>
          <span>06</span>
          <span>12</span>
          <span>18</span>
          <span>24</span>
        </div>

        {/* THUMB */}
        <div
          className="absolute top-[-6px] flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background shadow"
          style={{ left: `${value}%`, transform: "translateX(-50%)" }}
        >
          ⇆
        </div>
      </div>
    </div>
  );
}