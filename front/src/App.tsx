import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, LayoutGroup } from 'framer-motion';

import { useTrackPageView } from '@/analytics/hooks/useTrackPageView';
import { RequireAuth } from '@/auth/components/RequireAuth';
import { RequireNotAuth } from '@/auth/components/RequireNotAuth';
import { AuthModal } from '@/auth/components/ui/Modal';
import { useGoToHotkeys } from '@/hotkeys/hooks/useGoToHotkeys';
import { AuthLayout } from '@/ui/layout/AuthLayout';
import { DefaultLayout } from '@/ui/layout/DefaultLayout';
import { CreateProfile } from '~/pages/auth/CreateProfile';
import { CreateWorkspace } from '~/pages/auth/CreateWorkspace';
import { Index } from '~/pages/auth/Index';
import { PasswordLogin } from '~/pages/auth/PasswordLogin';
import { Verify } from '~/pages/auth/Verify';
import { Companies } from '~/pages/companies/Companies';
import { Opportunities } from '~/pages/opportunities/Opportunities';
import { People } from '~/pages/people/People';
import { SettingsProfile } from '~/pages/settings/SettingsProfile';

/**
 * AuthRoutes is used to allow transitions between auth pages with framer-motion.
 */
function AuthRoutes() {
  const location = useLocation();

  return (
    <LayoutGroup>
      <AuthModal>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="" element={<Index />} />
            <Route path="callback" element={<Verify />} />
            <Route path="password-login" element={<PasswordLogin />} />
            <Route path="create/workspace" element={<CreateWorkspace />} />
            <Route path="create/profile" element={<CreateProfile />} />
          </Routes>
        </AnimatePresence>
      </AuthModal>
    </LayoutGroup>
  );
}

export function App() {
  useGoToHotkeys('p', '/people');
  useGoToHotkeys('c', '/companies');
  useGoToHotkeys('o', '/opportunities');
  useGoToHotkeys('s', '/settings/profile');

  useTrackPageView();

  return (
    <DefaultLayout>
      <Routes>
        <Route
          path="*"
          element={
            <RequireAuth>
              <Routes>
                <Route path="" element={<Navigate to="/people" replace />} />
                <Route path="people" element={<People />} />
                <Route path="companies" element={<Companies />} />
                <Route path="opportunities" element={<Opportunities />} />
                <Route
                  path="settings/*"
                  element={
                    <Routes>
                      <Route path="profile" element={<SettingsProfile />} />
                    </Routes>
                  }
                />
              </Routes>
            </RequireAuth>
          }
        />
        <Route
          path="auth/*"
          element={
            <RequireNotAuth>
              <AuthLayout>
                <AuthRoutes />
              </AuthLayout>
            </RequireNotAuth>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}
