import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout, PublicLayout, MapLayout } from '@/components/layout';
import { OperatorRoute, AdminRoute, CrisisRoute } from '@/components/auth';

// Pages
import { LoginPage } from '@/pages/auth';
import { HomePage } from '@/pages/HomePage';
import { UnauthorizedPage } from '@/pages/UnauthorizedPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

// Citizen Pages
import { MapPage, InfoPage, PreparationPage, FAQPage } from '@/pages/citizen';

// Shelter Pages
import { ShelterDetailPage } from '@/pages/shelter';

// Operator Pages
import { OperatorDashboard, ShelterListPage } from '@/pages/operator';

// Admin Pages
import {
  AdminDashboard,
  ApprovalsPage,
  AdminSheltersPage,
  AnalyticsPage,
  UserManagementPage,
} from '@/pages/admin';

// Crisis Manager Pages
import { CrisisDashboard, BroadcastPage, CrisisLogsPage } from '@/pages/crisis';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes (no auth required) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Map route - full screen, no sidebar */}
        <Route element={<MapLayout />}>
          <Route path="/map" element={<MapPage />} />
        </Route>

        {/* Public layout routes - no sidebar */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/preparation" element={<PreparationPage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Route>

        {/* Operator routes - requires operator role or higher */}
        <Route element={<MainLayout />}>
          <Route
            path="/operator"
            element={
              <OperatorRoute>
                <OperatorDashboard />
              </OperatorRoute>
            }
          />
          <Route
            path="/operator/shelters"
            element={
              <OperatorRoute>
                <ShelterListPage />
              </OperatorRoute>
            }
          />
          <Route
            path="/operator/reports"
            element={
              <OperatorRoute>
                <div className="p-4">
                  <h1 className="text-2xl font-bold">Berichte</h1>
                  <p className="text-slate-600">Berichtsfunktionen werden in einer zukünftigen Version verfügbar sein.</p>
                </div>
              </OperatorRoute>
            }
          />
        </Route>

        {/* Admin routes - requires municipal_admin role or higher */}
        <Route element={<MainLayout />}>
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/approvals"
            element={
              <AdminRoute>
                <ApprovalsPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/shelters"
            element={
              <AdminRoute>
                <AdminSheltersPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <AdminRoute>
                <AnalyticsPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <UserManagementPage />
              </AdminRoute>
            }
          />
        </Route>

        {/* Crisis Manager routes - requires crisis_manager or federal_admin role */}
        <Route element={<MainLayout />}>
          <Route
            path="/crisis"
            element={
              <CrisisRoute>
                <CrisisDashboard />
              </CrisisRoute>
            }
          />
          <Route
            path="/crisis/broadcast"
            element={
              <CrisisRoute>
                <BroadcastPage />
              </CrisisRoute>
            }
          />
          <Route
            path="/crisis/logs"
            element={
              <CrisisRoute>
                <CrisisLogsPage />
              </CrisisRoute>
            }
          />
        </Route>

        {/* Shelter detail route - accessible to all authenticated users */}
        <Route element={<MainLayout />}>
          <Route path="/shelter/:id" element={<ShelterDetailPage />} />
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
