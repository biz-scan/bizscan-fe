import { Outlet } from 'react-router-dom';
<<<<<<< HEAD
=======
import Sidebar from '@/components/layout/Sidebar';
>>>>>>> eaa9d8b ([Feat]: 사이드바 공용 컴포넌트)

export default function MainLayout() {
  return (
    <div className="flex min-h-screen w-full">
<<<<<<< HEAD
=======
      <Sidebar />
>>>>>>> eaa9d8b ([Feat]: 사이드바 공용 컴포넌트)
      <div className="flex flex-1 flex-col min-w-0">
        <main className="flex-1 overflow-auto p-[50px] bg-[#F8FAFF]">
          <Outlet />
        </main>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> eaa9d8b ([Feat]: 사이드바 공용 컴포넌트)
