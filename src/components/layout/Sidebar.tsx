import { NavLink, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

import AnalysisActive from '@/assets/icons/IconNav/icon=graph-bar, state=active.svg?react';
import AnalysisDefault from '@/assets/icons/IconNav/icon=graph-bar, state=Default.svg?react';
import HomeActive from '@/assets/icons/IconNav/icon=home, state=active.svg?react';
import HomeDefault from '@/assets/icons/IconNav/icon=home, state=Default.svg?react';
import NoteActive from '@/assets/icons/IconNav/icon=note-outline-rounded, state=active.svg?react';
import NoteDefault from '@/assets/icons/IconNav/icon=note-outline-rounded, state=Default.svg?react';
import PersonActive from '@/assets/icons/IconNav/icon=person, state=active.svg?react';
import PersonDefault from '@/assets/icons/IconNav/icon=person, state=Default.svg?react';
import SettingActive from '@/assets/icons/IconNav/icon=setting, state=active.svg?react';
import SettingDefault from '@/assets/icons/IconNav/icon=setting, state=Default.svg?react';

export default function Sidebar() {
  const { pathname } = useLocation();

  const menuItems = [
    { to: '/dashboard', label: '대시보드', ActiveIcon: HomeActive, DefaultIcon: HomeDefault },
    {
      to: '/report',
      label: '상세 분석 리포트',
      ActiveIcon: AnalysisActive,
      DefaultIcon: AnalysisDefault,
    },
    { to: '/notes', label: '나의 실행 노트', ActiveIcon: NoteActive, DefaultIcon: NoteDefault },
    {
      to: '/settings',
      label: '내 가게 설정',
      ActiveIcon: SettingActive,
      DefaultIcon: SettingDefault,
    },
    {
      to: '/profile',
      label: '프로필 및 로그아웃',
      ActiveIcon: PersonActive,
      DefaultIcon: PersonDefault,
    },
  ];

  return (
    <aside className="w-[332px] h-screen bg-blue-light flex flex-col items-center shrink-0 sticky top-0 border-r border-blue-100 overflow-hidden">
      <nav className="mt-[47px] flex flex-col items-start gap-[20px] w-[276px]">
        {menuItems.map((item) => {
          const isActuallyActive = (navActive: boolean) =>
            navActive || (item.to === '/report' && pathname.startsWith('/solution/'));

          return (
            <NavLink key={item.to} to={item.to} className="w-full">
              {({ isActive }) => {
                const active = isActuallyActive(isActive);
                const Icon = active ? item.ActiveIcon : item.DefaultIcon;

                return (
                  <div
                    className={clsx(
                      'flex items-center w-[276px] h-[56px] px-[20px] rounded-[8px]',
                      'transition-[background-color,color] duration-200',
                      active
                        ? 'bg-gra2 shadow-md'
                        : 'bg-blue-light-hover hover:bg-white/40 shadow-none'
                    )}
                  >
                    <div className="flex items-center gap-[12px]">
                      <Icon className="w-6 h-6 shrink-0" />
                      <span
                        className={clsx(
                          'font-["Pretendard"] text-[20px] font-semibold tracking-[-1px] leading-[160%] whitespace-nowrap',
                          active ? 'text-blue-light' : 'text-blue-normal-hover'
                        )}
                      >
                        {item.label}
                      </span>
                    </div>
                  </div>
                );
              }}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
