import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserRole } from '@/types';
import { users } from '@/data';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string) => {
        set({ isLoading: true });

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const foundUser = users.find((u) => u.email === email);

        if (foundUser) {
          set({ user: foundUser, isAuthenticated: true, isLoading: false });
          return true;
        }

        set({ isLoading: false });
        return false;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      switchRole: (role: UserRole) => {
        const userWithRole = users.find((u) => u.role === role);
        if (userWithRole) {
          set({ user: userWithRole, isAuthenticated: true });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Helper to check if user has required role
export const hasRole = (user: User | null, allowedRoles: UserRole[]): boolean => {
  if (!user) return false;
  return allowedRoles.includes(user.role);
};

// Role hierarchy for permission checks
export const roleHierarchy: Record<UserRole, number> = {
  citizen: 0,
  operator: 1,
  municipal_admin: 2,
  state_admin: 3,
  federal_admin: 4,
  crisis_manager: 5,
};

export const hasMinimumRole = (user: User | null, minimumRole: UserRole): boolean => {
  if (!user) return false;
  return roleHierarchy[user.role] >= roleHierarchy[minimumRole];
};
