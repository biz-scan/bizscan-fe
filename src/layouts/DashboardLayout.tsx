import { Outlet } from 'react-router-dom';

import { Header, Sidebar } from '@/components/layout';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header title="대시보드" />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
