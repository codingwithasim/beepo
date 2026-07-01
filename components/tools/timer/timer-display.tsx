

type Props = {
  remaining: number;
};

export function TimerDisplay({ remaining }: Props) {
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  const formatted = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
        Focus Timer
      </p>

      <h1 className="text-8xl md:text-9xl">
        {formatted}
      </h1>
    </div>
  );
}