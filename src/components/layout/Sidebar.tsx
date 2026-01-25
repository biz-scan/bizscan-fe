import { NavLink } from 'react-router-dom';

const sidebarItems = [
  { to: '/dashboard', label: '대시보드' },
  { to: '/report', label: '상세분석 리포트' },
  { to: '/notes', label: '나의 실행노트' },
  { to: '/settings', label: '내 가게 설정' },
  { to: '/profile', label: '프로필' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r flex flex-col">
      <div className="px-6 py-4 border-b">
        <h1 className="text-xl text-black font-bold">Bizscan</h1>
      </div>

      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-4 py-4 border-t">
        <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          로그아웃
        </button>
      </div>
    </aside>
  );
}
