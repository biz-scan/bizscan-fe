interface FieldLabelProps {
    text: string;
  }
  
  export default function FieldLabel({ text }: FieldLabelProps) {
    return (
      <div className="flex items-center gap-[15px] whitespace-nowrap">
        <span className="h-[20px] w-[3px] shrink-0 bg-blue-normal rounded-full" />
        <h5 className="text-blue-normal">{text}</h5>
      </div>
    );
  }
  