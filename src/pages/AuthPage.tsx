import { useSearchParams } from 'react-router-dom';

import LogoIcon from '@/assets/icons/Logo/Logo.svg?react';
import LoginForm from '@/components/AuthPage/LoginForm';
import RegisterForm from '@/components/AuthPage/RegisterForm';
import { cn } from '@/lib/utils';

export default function AuthPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const mode = searchParams.get('mode') ?? 'login';
  const isLogin = mode !== 'register';

  const handleTabChange = () => setSearchParams({ mode: isLogin ? 'register' : 'login' });

  return (
    <div
      className={cn(
        'flex-1 flex flex-col w-full items-center justify-center bg-center bg-no-repeat bg-cover',
        isLogin ? 'h-[1280px]' : 'h-[1480px]'
      )}
      style={{ backgroundImage: "url('/images/background.png')" }}
    >
      <div className="">
        <header className="mb-20 flex flex-col items-center">
          <div>
            <LogoIcon className="w-[340px] h-[83.21px]" />
          </div>
          <p className="typo-p2-medium text-grey-dark mt-5">
            데이터에서 실행으로, 내 가게 성공 레시피
          </p>
        </header>

        <section className="bg-grey-light px-35 py-25 rounded-[40px] shadow-normal">
          {isLogin ? (
            <LoginForm handleTabChange={handleTabChange} />
          ) : (
            <RegisterForm handleTabChange={handleTabChange} />
          )}
        </section>
      </div>
    </div>
  );
}
