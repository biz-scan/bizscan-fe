import { Link } from 'react-router-dom';

import DownArrowIcon from '@/assets/icons/Arrow/down.svg?react';
import CloseIcon from '@/assets/icons/Close/state=Default.svg?react';
import CheckIcon from '@/assets/icons/Icon/type=check.svg?react';
import LogoIcon from '@/assets/icons/Logo/Logo.svg?react';
import TuffyIcon from '@/assets/icons/tuffy.svg?react';
import useAuthStore from '@/store/useAuthStore';

export default function HomePage() {
  const { user } = useAuthStore();
  return (
    <div className="flex flex-col items-center gap-10 p-10">
      {/* 기존 내용 */}
      <div className="flex flex-col items-center gap-4">
        <TuffyIcon />
        <h1 className="text-blue-normal">홈</h1>
        <p className="text-p1-regular text-grey-normal">화이팅~!</p>
        <p className="text-p2-medium">이름: {user?.name}</p>
        <Link to="/login" className="text-blue-normal hover:underline">
          로그인 페이지로
        </Link>
      </div>

      {/* 테마 테스트 섹션 */}
      <div className="flex flex-col gap-6 w-full max-w-md p-8 bg-white shadow-normal rounded-lg">
        <h2 className="text-blue-normal">Theme Test</h2>

        <div className="space-y-4">
          <div className="p-4 bg-gra2 text-white rounded shadow-header">
            <h3 className="text-white">Gradient & Shadow</h3>
            <p className="text-p2-medium">bg-gra2 + shadow-header</p>
          </div>

          <div className="flex gap-2">
            <div className="flex-1 h-12 bg-blue-light flex items-center justify-center rounded text-blue-dark active:bg-blue-light-active">
              Light
            </div>
            <div className="flex-1 h-12 bg-blue-normal flex items-center justify-center rounded text-white hover:bg-blue-normal-hover">
              Normal
            </div>
            <div className="flex-1 h-12 bg-blue-darker flex items-center justify-center rounded text-white active:bg-blue-dark-active">
              Darker
            </div>
          </div>

          <p className="text-error text-p2-semibold">Error Message Test (P2-Semibold)</p>
          <p className="text-lead-semibold text-grey-dark">Lead Semibold Test</p>
        </div>

        {/* 아이콘 테스트 */}
        <div className="pt-4 border-t border-grey-light">
          <h3 className="text-grey-normal text-p2-semibold mb-4">Icon Test</h3>
          <div className="flex gap-6 items-center">
            <div className="flex flex-col items-center gap-1">
              <LogoIcon width={80} />
              <span className="text-xs text-grey-normal">Logo</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <DownArrowIcon />
              <span className="text-xs text-grey-normal">Arrow</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <CloseIcon />
              <span className="text-xs text-grey-normal">Close</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <CheckIcon width={24} height={24} />
              <span className="text-xs text-grey-normal">Check</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
