import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-1 flex-col min-w-0">
        <main className="flex-1 overflow-auto p-[50px] bg-[#F8FAFF]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
