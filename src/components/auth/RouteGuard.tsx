import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore, hasRole, hasMinimumRole } from '@/store';
import type { UserRole } from '@/types';

interface RouteGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  minimumRole?: UserRole;
  requireAuth?: boolean;
}

export function RouteGuard({
  children,
  allowedRoles,
  minimumRole,
  requireAuth = true,
}: RouteGuardProps) {
  const { user, isAuthenticated } = useAuthStore();
  const location = useLocation();

  // Check if authentication is required
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check for specific allowed roles
  if (allowedRoles && !hasRole(user, allowedRoles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Check for minimum role level
  if (minimumRole && !hasMinimumRole(user, minimumRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}

// Convenience components for common role checks
export function OperatorRoute({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuard minimumRole="operator">
      {children}
    </RouteGuard>
  );
}

export function AdminRoute({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuard minimumRole="municipal_admin">
      {children}
    </RouteGuard>
  );
}

export function CrisisRoute({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuard allowedRoles={['crisis_manager', 'federal_admin']}>
      {children}
    </RouteGuard>
  );
}
