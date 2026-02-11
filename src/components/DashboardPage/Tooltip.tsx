interface TooltipProps {
  text: string;
  isReverse?: boolean;
}

export default function Tooltip({ text, isReverse }: TooltipProps) {
  return (
    <div className="relative inline-block whitespace-nowrap">
      <div
        className="absolute w-3 h-3 bg-blue-light rotate-45 transform 
                   border-t border-l border-blue-normal/20"
        style={{
          top: '-6px',
          left: isReverse ? '20px' : 'auto',
          right: isReverse ? 'auto' : '20px',
          zIndex: 1,
        }}
      />

      <div className="relative bg-blue-light border border-blue-normal/20 rounded-[8px] px-4 py-3 shadow-lg overflow-hidden">
        <p className="typo-p2-semibold text-blue-normal leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
