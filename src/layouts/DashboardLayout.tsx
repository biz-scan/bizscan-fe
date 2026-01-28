import { Outlet } from 'react-router-dom';

import { Footer, Header, Sidebar } from '@/components/layout';

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
