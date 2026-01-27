import { Outlet } from 'react-router-dom';

import { Footer, Header } from '@/components/layout';

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
