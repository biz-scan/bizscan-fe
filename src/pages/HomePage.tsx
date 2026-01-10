import { Link } from 'react-router-dom';

import TuffyIcon from '@/assets/icons/tuffy.svg?react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold">홈</h1>
      <p className="text-gray-600">로그인 후 볼 수 있는 페이지</p>
      <TuffyIcon />
      <Link to="/login" className="text-blue-500 hover:underline">
        로그인 페이지로
      </Link>
    </div>
  );
}
