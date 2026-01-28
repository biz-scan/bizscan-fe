import { Link, useLocation, useNavigate } from 'react-router-dom';

import Logo from '@/assets/icons/Logo/Logo.svg?react';
import { Button } from '@/components/ui/Button';
import useAuthStore from '@/store/useAuthStore';

import HeaderConfirmDialog from './HeaderConfirmDialog';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();

  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <header className="bg-grey-light border-b h-20 flex items-center px-12 justify-between">
      {location.pathname === '/' ? (
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

      {isAuthenticated ? (
        <div>
          <p className="typo-p2-semibold text-grey-dark">{user?.name}님 환영합니다!</p>
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
