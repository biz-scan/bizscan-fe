import Swot_O from '@/assets/icons/SwotCard/Swot_O.svg';
import Swot_S from '@/assets/icons/SwotCard/Swot_S.svg';
import Swot_T from '@/assets/icons/SwotCard/Swot_T.svg';
import Swot_W from '@/assets/icons/SwotCard/Swot_W.svg';
import Swot_S_B from '@/assets/icons/SwotCard/Swot_S_B.svg';
import Swot_W_B from '@/assets/icons/SwotCard/Swot_W_B.svg';
import Swot_O_B from '@/assets/icons/SwotCard/Swot_O_B.svg';
import Swot_T_B from '@/assets/icons/SwotCard/Swot_T_B.svg';

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
    S: { default: Swot_S, active: Swot_S_B, pos: 'right-0 bottom-0' },
    W: { default: Swot_W, active: Swot_W_B, pos: 'left-0 bottom-0' },
    O: { default: Swot_O, active: Swot_O_B, pos: 'right-0 top-0' },
    T: { default: Swot_T, active: Swot_T_B, pos: 'left-0 top-0' },
  };

  const { default: defaultIcon, active: activeIcon, pos } = theme[type];
  const currentIcon = isActive ? activeIcon : defaultIcon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer relative flex flex-col w-full max-w-[664px] h-[160px] rounded-[20px] overflow-hidden pt-[25px] px-[clamp(20px,5vw,48px)] transition-all duration-200 text-left shadow-normal
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
          src={currentIcon}
          alt={`SWOT ${type}`}
          className={`w-auto h-auto max-h-full transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-80'}`}
        />
      </div>
    </button>
  );
}
