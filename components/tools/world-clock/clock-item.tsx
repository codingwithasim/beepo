type Props = {
  name: string;
  time: string;
};

export function ClockItem({ name, time }: Props) {
  return (
    <div className="flex items-center justify-between rounded-xl border p-4">
      <span className="font-medium">{name}</span>
      <span className="font-mono text-lg">{time}</span>
    </div>
  );
}