type Props = {
  elapsed: number;
};

export function StopwatchDisplay({ elapsed }: Props) {
  const totalSeconds = Math.floor(elapsed / 1000);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const ms = Math.floor((elapsed % 1000) / 10);

  return (
    <h1 className="max-w-full whitespace-nowrap font-mono text-[clamp(2.75rem,14vw,8rem)] leading-none tracking-tight tabular-nums">
      {String(minutes).padStart(2, "0")}:
      {String(seconds).padStart(2, "0")}.
      {String(ms).padStart(2, "0")}
    </h1>
  );
}