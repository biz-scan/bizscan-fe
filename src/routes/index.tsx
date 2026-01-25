import { createBrowserRouter } from 'react-router-dom';

import DashboardLayout from '@/layouts/DashboardLayout';
import OnboardingLayout from '@/layouts/OnboardingLayout';
import PublicLayout from '@/layouts/PublicLayout';
import AuthPage from '@/pages/AuthPage';
import DashboardPage from '@/pages/DashboardPage';
import HomePage from '@/pages/HomePage';
import NotesPage from '@/pages/NotesPage';
import OnboardingPage from '@/pages/OnboardingPage';
import ProfilePage from '@/pages/ProfilePage';
import ReportPage from '@/pages/ReportPage';
import SettingsPage from '@/pages/SettingsPage';

export const router = createBrowserRouter([
  // Public routes (메인, 로그인/회원가입)
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'auth', element: <AuthPage /> },
    ],
  },

  // Onboarding route (매장 정보 입력)
  {
    path: '/onboarding',
    element: <OnboardingLayout />,
    children: [{ index: true, element: <OnboardingPage /> }],
  },

  // Dashboard routes (로그인 후 사이드바 메뉴)
  // 이부분은 /:Id 같은걸 params로 추가해야 할수도 있을 것 같습니다
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'report', element: <ReportPage /> },
      { path: 'notes', element: <NotesPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'profile', element: <ProfilePage /> },
    ],
  },
]);
