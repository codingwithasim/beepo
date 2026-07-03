"use client";

import { useStopwatch } from "./use-stopwatch";
import { StopwatchDisplay } from "./stopwatch-display";
import { StopwatchControls } from "./stopwatch-controls";

import { Card, CardContent } from "@/components/ui/card";

export function StopwatchTool() {
  const sw = useStopwatch();

  return (
    <div className="flex h-full items-center justify-center">
      <Card className="w-full ring-0 bg-background shadow-none max-w-4xl rounded-3xl">
        <CardContent className="flex flex-col items-center gap-10 py-16">
          
          <StopwatchDisplay elapsed={sw.elapsed} />

          <StopwatchControls
            status={sw.status}
            start={sw.start}
            pause={sw.pause}
            reset={sw.reset}
            lap={sw.lap}
          />
        </CardContent>
      </Card>
    </div>
  );
}