import { Outlet } from 'react-router-dom';

import { Footer, Header } from '@/components/layout';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
