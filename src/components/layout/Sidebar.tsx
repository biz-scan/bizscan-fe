import { useEffect } from 'react';
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

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
    <>
      <div
        className={clsx(
          'fixed inset-0 top-20 z-20 bg-black/50 transition-opacity lg:hidden',
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        )}
        onClick={onClose}
      />
      <aside
        className={clsx(
          'bg-blue-light h-screen shrink-0 flex flex-col items-center overflow-hidden',

          'fixed top-0 left-0 z-30 w-[332px] pt-20 lg:pt-[40px]',

          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full',

          'lg:sticky lg:top-0 lg:translate-x-0 lg:z-0 lg:w-[88px] lg:shadow-none',
          'xl:w-[332px]'
        )}
      >
        <nav className="mt-[47px] lg:mt-2 xl:mt-4 flex flex-col items-center gap-[20px] w-full">
          {menuItems.map((item) => {
            const isActuallyActive = (navActive: boolean) =>
              navActive || (item.to === '/report' && pathname.startsWith('/solution/'));

            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={clsx(
                  'h-[56px] flex items-center rounded-[8px] transition-all duration-200',
                  'w-[276px]',
                  'lg:w-[56px] lg:justify-center',
                  'xl:w-[276px]'
                )}
              >
                {({ isActive }) => {
                  const active = isActuallyActive(isActive);
                  const Icon = active ? item.ActiveIcon : item.DefaultIcon;

                  return (
                    <div
                      className={clsx(
                        'flex items-center w-full h-full rounded-[8px] transition-colors duration-200',
                        'pl-[24px]',
                        'lg:px-0 lg:justify-center',
                        'xl:pl-[24px] xl:justify-start',
                        active
                          ? 'bg-gra2 shadow-normal'
                          : 'bg-blue-light-hover hover:bg-white/40 shadow-none'
                      )}
                    >
                      <div className="flex items-center gap-[12px]">
                        <Icon className="w-6 h-6 shrink-0" />
                        <span
                          className={clsx(
                            'typo-p1-semibold whitespace-nowrap tracking-[-1px] transition-opacity duration-200',
                            active ? 'text-blue-light' : 'text-blue-normal-hover',
                            'block lg:hidden xl:block'
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
    </>
  );
}
