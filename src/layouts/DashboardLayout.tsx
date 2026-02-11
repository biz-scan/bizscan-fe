import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer, Header, Sidebar } from '@/components/layout';

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Header onMenuClick={() => setIsSidebarOpen((prev) => !prev)} />

      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
