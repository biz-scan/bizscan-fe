function clamp(n: number, min = 0, max = 100) {
    return Math.max(min, Math.min(max, n));
  }
  
  export default function ProgressBar({ value }: { value: number }) {
    const v = clamp(value);
  
    return (
      <div
        className="h-[12px] w-full overflow-hidden rounded-full"
        style={{
          // gra1
          background: 'linear-gradient(90deg, #D9E5F0 0%, #99BAF5 100%)',
        }}
      >
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${v}%`,
            // gra2
            background: 'linear-gradient(90deg, #024FE0 0%, #5A8DEB 100%)',
          }}
        />
      </div>
    );
  }
  