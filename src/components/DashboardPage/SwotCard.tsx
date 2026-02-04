import Swot_S from '@/assets/icons/SwotCard/Swot_S.svg';
import Swot_W from '@/assets/icons/SwotCard/Swot_W.svg';
import Swot_O from '@/assets/icons/SwotCard/Swot_O.svg';
import Swot_T from '@/assets/icons/SwotCard/Swot_T.svg';

interface SwotCardProps {
  type: 'S' | 'W' | 'O' | 'T';
  title: string;
  keyword: string;
  description: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function SwotCard({
  type,
  title,
  keyword,
  description,
  isActive,
  onClick,
}: SwotCardProps) {
  const isReverse = type === 'W' || type === 'T';

  const theme = {
    S: { icon: Swot_S, pos: 'right-0 bottom-0' },
    W: { icon: Swot_W, pos: 'left-0 bottom-0' },
    O: { icon: Swot_O, pos: 'right-0 top-0' },
    T: { icon: Swot_T, pos: 'left-0 top-0' },
  };

  const { icon, pos } = theme[type];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex flex-col w-full max-w-[664px] h-[160px] rounded-[20px] overflow-hidden pt-[25px] px-[clamp(20px,5vw,48px)] transition-all duration-200 text-left shadow-normal
    ${isActive ? 'bg-blue-light ring-1 ring-blue-normal' : 'bg-grey-light'}`}
    >
      <h3 className={`z-10 mb-[16px] w-full ${isReverse ? 'text-right' : 'text-left'}`}>
        <span className="text-blue-normal">{title[0]}</span>
        <span className="text-grey-darker">{title.slice(1)}</span>
      </h3>

      <div
        className={`z-10 flex items-center w-full ${isReverse ? 'flex-row-reverse' : 'flex-row'}`}
      >
        <div className="flex justify-center items-center px-[24px] py-[10px] rounded-[8px] border border-blue-normal bg-transparent">
          <span className="typo-p1-bold text-blue-normal whitespace-nowrap">{keyword}</span>
        </div>

        <p
          className={`typo-p1-semibold text-grey-normal truncate ${isReverse ? 'mr-[24px]' : 'ml-[24px]'}`}
        >
          {description}
        </p>
      </div>

      <div className={`absolute ${pos} pointer-events-none z-0`}>
        <img
          src={icon}
          alt={`SWOT ${type}`}
          className={`w-auto h-auto max-h-full transition-opacity ${isActive ? 'opacity-100' : 'opacity-80'}`}
        />
      </div>
    </button>
  );
}
