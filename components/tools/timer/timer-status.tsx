import { Badge } from "@/components/ui/badge";


type TimerStatusProps = {
  duration: number;
  status: string;
};

export function TimerStatus({
  duration,
  status,
}: TimerStatusProps) {
  return (
    <div className="flex items-center gap-8 text-sm text-muted-foreground">
      <div className="flex flex-col items-center">
        <span>Duration</span>
        <strong className="text-foreground">
          {Math.floor(duration / 60)} min
        </strong>
      </div>

      <div className="h-8 w-px bg-border" />

      <div className="flex flex-col items-center">
        <span>Status</span>

        <Badge>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </div>
    </div>
  );
}