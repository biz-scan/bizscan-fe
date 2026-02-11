import { Outlet } from 'react-router-dom';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export default function OnboardingLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1 overflow-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
