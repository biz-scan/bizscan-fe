interface TooltipProps {
  text: string;
  isReverse?: boolean;
}

export default function Tooltip({ text, isReverse }: TooltipProps) {
  return (
    <div className="relative inline-block whitespace-nowrap">
      <div
        className="absolute w-3 h-3 bg-blue-light-hover rotate-45 transform"
        style={{
          top: '-6px',
          left: isReverse ? '20px' : 'auto',
          right: isReverse ? 'auto' : '20px',
          zIndex: 1,
        }}
      />

      <div className="relative bg-blue-light-hover rounded-[8px] px-4 py-3 shadow-lg">
        <p className="typo-p2-semibold text-blue-normal leading-[140%] tracking-[-0.4px]">{text}</p>
      </div>
    </div>
  );
}
