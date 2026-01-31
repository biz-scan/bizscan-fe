import ArrorIcon from '@/assets/icons/Icon/type=arrow.svg?react';

interface DescriptionBoxProps {
  icon: React.ReactNode;
  text1: string;
  text2: string;
}

export default function DescriptionBox({ icon, text1, text2 }: DescriptionBoxProps) {
  return (
    <div className="flex flex-col items-center px-21 py-10 gap-12 border border-blue-light-active rounded-[20px] shrink-0">
      <div className="shrink-0">{icon}</div>
      <div className="flex flex-col gap-5 items-center">
        <h2 className="typo-lead-semibold text-blue-normal whitespace-nowrap">{text1}</h2>
        <ArrorIcon className="shrink-0" />
        <h5 className="bg-gra2 py-2.5 px-7 text-grey-light rounded-[10px] shrink-0 whitespace-nowrap">{text2}</h5>
      </div>
    </div>
  );
}
