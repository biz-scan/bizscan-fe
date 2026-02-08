import { createBrowserRouter } from 'react-router-dom';

import DashboardLayout from '@/layouts/DashboardLayout';
import OnboardingLayout from '@/layouts/OnboardingLayout';
import PublicLayout from '@/layouts/PublicLayout';
import { AnalysisStatusPage } from '@/pages/AnalysisStatusPage';
import AuthPage from '@/pages/AuthPage';
import DashboardPage from '@/pages/DashboardPage';
import LandingPage from '@/pages/LandingPage';
import NoteDetailPage from '@/pages/NoteDetailPage';
import NotesPage from '@/pages/NotesPage';
import OnboardingPage from '@/pages/OnboardingPage';
import ProfilePage from '@/pages/ProfilePage';
import ReportPage from '@/pages/ReportPage';
import SettingsPage from '@/pages/SettingsPage';
import SolutionDetailPage from '@/pages/SolutionDetailPage';
import ProtectedRoute from '@/providers/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'auth', element: <AuthPage /> },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <OnboardingLayout />,
        children: [
          { path: 'onboarding', element: <OnboardingPage /> },
          { path: '/analyze/:requestId', element: <AnalysisStatusPage /> },
        ],
      },
      {
        path: '/',
        element: <DashboardLayout />,
        children: [
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'report', element: <ReportPage /> },
          { path: 'notes', element: <NotesPage /> },
          { path: 'notes/:noteId', element: <NoteDetailPage /> },
          { path: 'settings', element: <SettingsPage /> },
          { path: 'profile', element: <ProfilePage /> },
          { path: 'solution/:id', element: <SolutionDetailPage /> },
        ],
      },
    ],
  },
]);
