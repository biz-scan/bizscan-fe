function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

export default function ProgressBar({ value }: { value: number }) {
  const v = clamp(value);

  return (
    <div className="bg-gra1-h h-3 w-full overflow-hidden rounded-full">
      <div
        className="bg-gra2-h h-full rounded-full transition-all"
        style={{ width: `${v}%` }}
      />
    </div>
  );
}
