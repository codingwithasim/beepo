type Props = {
  remaining: number;
  phase: "work" | "break";
  session: number;
};

export function PomodoroDisplay({
  remaining,
  phase,
  session,
}: Props) {
  const m = Math.floor(remaining / 60);
  const s = remaining % 60;

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Session {session} • {phase.toUpperCase()}
      </p>

      <h1 className="font-mono text-8xl md:text-9xl">
        {String(m).padStart(2, "0")}:
        {String(s).padStart(2, "0")}
      </h1>
    </div>
  );
}