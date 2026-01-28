import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type AuthTab = 'login' | 'signup';

export default function AuthPage() {
  const [tab, setTab] = useState<AuthTab>('login');
  const [searchParams, setSearchParams] = useSearchParams();

  const mode = searchParams.get('mode'); // 'register' | 'login'
  console.log(mode);
  //setSearchParams({ mode: mode === 'login' ? 'register' : 'login' });
  return (
    <div className="max-w-md mx-auto">
      <div className="flex border-b mb-6">
        <button
          onClick={() => setTab('login')}
          className={`flex-1 py-3 text-center font-medium transition-colors ${
            tab === 'login'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          로그인
        </button>
        <button
          onClick={() => setTab('signup')}
          className={`flex-1 py-3 text-center font-medium transition-colors ${
            tab === 'signup'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          회원가입
        </button>
      </div>

      {tab === 'login' ? (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center">로그인</h2>
          <p className="text-gray-500 text-center">로그인 폼이 들어갈 영역입니다.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center">회원가입</h2>
          <p className="text-gray-500 text-center">회원가입 폼이 들어갈 영역입니다.</p>
        </div>
      )}
    </div>
  );
}
