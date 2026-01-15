import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'super_admin' | 'finance_admin' | 'operations_admin' | 'manager' | 'read_only';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUserRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for different roles
const demoUsers: Record<UserRole, User> = {
  super_admin: {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    role: 'super_admin',
  },
  finance_admin: {
    id: '2',
    name: 'Michael Torres',
    email: 'michael.torres@company.com',
    role: 'finance_admin',
  },
  operations_admin: {
    id: '3',
    name: 'Emma Williams',
    email: 'emma.williams@company.com',
    role: 'operations_admin',
  },
  manager: {
    id: '4',
    name: 'James Park',
    email: 'james.park@company.com',
    role: 'manager',
  },
  read_only: {
    id: '5',
    name: 'Alex Johnson',
    email: 'alex.johnson@company.com',
    role: 'read_only',
  },
};

export const roleLabels: Record<UserRole, string> = {
  super_admin: 'Super Admin',
  finance_admin: 'Finance Admin',
  operations_admin: 'Operations Admin',
  manager: 'Manager',
  read_only: 'Read Only',
};

export const roleStyles: Record<UserRole, string> = {
  super_admin: 'role-super-admin',
  finance_admin: 'role-finance',
  operations_admin: 'role-operations',
  manager: 'role-manager',
  read_only: 'role-readonly',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Simulate login - in production this would validate against backend
    await new Promise(resolve => setTimeout(resolve, 800));
    setUser(demoUsers.super_admin);
  };

  const logout = () => {
    setUser(null);
  };

  const setUserRole = (role: UserRole) => {
    setUser(demoUsers[role]);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      setUserRole,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
