import { Outlet } from 'react-router-dom';

import { Header } from '@/components/layout';

export default function OnboardingLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto max-w-2xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
