import { useNavigate } from 'react-router-dom';

import ArrowGray from '@/assets/icons/Arrow/gray.svg?react';
import { Button } from '@/components/ui/Button';

interface SolutionCardProps {
  id: string;
  title: string;
  tags: string[];
}

export default function SolutionCard({ id, title, tags }: SolutionCardProps) {
  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate(`/solution/${id}`);
  };

  return (
    <div className="w-full max-w-[1348px] mx-auto rounded-[20px] bg-grey-light shadow-[0_4px_20px_0_rgba(49,49,49,0.08)] px-[clamp(20px,5vw,48px)] py-[30px] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
      <div className="flex flex-col gap-[16px]">
        <p className="typo-lead-semibold text-grey-darker">{title}</p>

        <div className="flex flex-wrap gap-[8px]">
          {tags.map((tag, idx) => (
            <div
              key={idx}
              className="flex px-[10px] py-[4px] justify-center items-center rounded-[4px] bg-blue-light whitespace-nowrap"
            >
              <span className="text-blue-dark typo-p2-medium">{tag}</span>
            </div>
          ))}
        </div>
      </div>

      <Button variant="outline" size="sm" onClick={handleDetailClick} className="gap-[10px]">
        <span className="whitespace-nowrap">자세히 보기</span>
        <ArrowGray className="w-4 h-4 shrink-0 transition-transform" />
      </Button>
    </div>
  );
}
