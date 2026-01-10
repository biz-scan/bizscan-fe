import { Link } from 'react-router-dom';

import TuffyIcon from '@/assets/icons/tuffy.svg?react';
import useAuthStore from '@/store/useAuthStore';

export default function HomePage() {
  const { name } = useAuthStore();
  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-gray-600 text-2xl font-bold">홈</h1>
      <p className="text-gray-600 text-2xl font-bold">화이팅~!</p>
      <p className="text-gray-600">이름: {name}</p>
      <TuffyIcon />
      <Link to="/login" className="text-blue-500 hover:underline">
        로그인 페이지로
      </Link>
    </div>
  );
}
