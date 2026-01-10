import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b px-6 py-4">
        <h1 className="text-xl text-black font-bold">Bizscan</h1>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        <Outlet />
      </main>

      <footer className="border-t px-6 py-4 text-center text-sm text-gray-500">2025 Bizscan</footer>
    </div>
  );
}
