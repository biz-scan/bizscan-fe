import { Link, useLocation, useNavigate } from 'react-router-dom';

import Logo from '@/assets/icons/Logo/Logo.svg?react';
import MenuIcon from '@/assets/icons/SideBar/menu.svg?react';
import { Button } from '@/components/ui/Button';
import useAuthStore from '@/store/useAuthStore';

import HeaderConfirmDialog from './HeaderConfirmDialog';

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();

  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <header className="bg-grey-light h-20 flex items-center px-12 justify-between shadow-header relative z-50">
      <div className="flex items-center gap-3 lg:gap-0">
        <button type="button" onClick={onMenuClick} className="lg:hidden p-1 mr-2">
          <MenuIcon className="w-6 h-6 text-grey-dark cursor-pointer" />
        </button>

        {location.pathname === '/' ||
        location.pathname.includes('/auth') ||
        location.pathname.includes('/analyze/') ? (
          <Link to="/">
            <Logo />
          </Link>
        ) : location.pathname === '/onboarding' ? (
          <HeaderConfirmDialog>
            <Logo className="cursor-pointer" />
          </HeaderConfirmDialog>
        ) : (
          <Link to="/dashboard">
            <Logo />
          </Link>
        )}
      </div>

      {isAuthenticated ? (
        <div>
          <p className="typo-p2-semibold text-grey-dark">안녕하세요! {user?.nickname}님</p>
        </div>
      ) : (
        <div className="flex gap-3">
          <Button variant="white" onClick={() => navigate('/auth?mode=register')}>
            회원가입
          </Button>
          <Button variant="default" onClick={() => navigate('/auth?mode=login')}>
            로그인
          </Button>
        </div>
      )}
    </header>
  );
}
