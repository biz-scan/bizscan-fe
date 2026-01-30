import Swot_S from '@/assets/icons/SwotCard/Swot_S.svg';
import Swot_W from '@/assets/icons/SwotCard/Swot_W.svg';
import Swot_O from '@/assets/icons/SwotCard/Swot_O.svg';
import Swot_T from '@/assets/icons/SwotCard/Swot_T.svg';

interface SwotCardProps {
  type: 'S' | 'W' | 'O' | 'T';
  title: string;
  keyword: string;
  description: string;
}

export default function SwotCard({ type, title, keyword, description }: SwotCardProps) {
  const commonColor = 'text-blue-normal';
  const isReverse = type === 'W' || type === 'T';

  const theme = {
    S: { color: commonColor, icon: Swot_S, pos: 'right-0 bottom-0' },
    W: { color: commonColor, icon: Swot_W, pos: 'left-0 bottom-0' },
    O: { color: commonColor, icon: Swot_O, pos: 'right-0 top-0' },
    T: { color: commonColor, icon: Swot_T, pos: 'left-0 top-0' },
  };

  const { color, icon, pos } = theme[type];

  return (
    <div className="relative flex flex-col w-full max-w-[664px] h-[160px] rounded-[20px] bg-grey-light shadow-[0_4px_20px_0_rgba(49,49,49,0.08)] overflow-hidden pt-[25px] px-[clamp(20px,5vw,48px)]">
      <h3
        className={`z-10 font-pretendard text-[clamp(24px,2.5vw,32px)] font-bold leading-[140%] tracking-[-0.8px] mb-[16px] ${isReverse ? 'text-right' : 'text-left'}`}
      >
        <span className={color}>{title[0]}</span>
        <span className="text-grey-darker">{title.slice(1)}</span>
      </h3>

      <div className={`z-10 flex items-center ${isReverse ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className="flex justify-center items-center px-[clamp(20px,3vw,44px)] py-[10px] rounded-[8px] border border-blue-normal bg-transparent whitespace-nowrap">
          <span className="text-blue-normal font-pretendard text-[clamp(16px,1.5vw,20px)] font-bold leading-[140%] tracking-[-0.5px]">
            {keyword}
          </span>
        </div>

        <p
          className={`${isReverse ? 'mr-[24px]' : 'ml-[24px]'} text-grey-normal font-pretendard text-[clamp(16px,1.5vw,20px)] font-semibold leading-[140%] tracking-[-0.5px] whitespace-nowrap truncate`}
        >
          {description}
        </p>
      </div>

      <div className={`absolute ${pos} pointer-events-none z-0`}>
        <img src={icon} alt={`SWOT ${type}`} className="w-auto h-auto max-h-full" />
      </div>
    </div>
  );
}
