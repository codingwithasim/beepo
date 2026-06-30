"use client";

type Props = {
  remaining: number;
  duration: number;
};

export function TimerProgress({ remaining, duration }: Props) {
  const progress =
    duration > 0 ? ((duration - remaining) / duration) * 100 : 0;

  return (
    <div className="w-full">
      <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-primary transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}