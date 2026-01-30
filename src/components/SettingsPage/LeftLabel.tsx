interface LeftLabelProps {
    text: string;
  }
  
  export default function LeftLabel({ text }: LeftLabelProps) {
    return (
      <div className="flex items-center gap-[8px] whitespace-nowrap">
        <span className="h-[20px] w-[3px] shrink-0 bg-blue-normal rounded-full" />
        <h5 className="text-blue-normal">{text}</h5>
      </div>
    );
  }
  