"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { User, UserRole } from "@/lib/types";
import { mockUsers } from "@/lib/mock-data";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: {
    email: string;
    password: string;
    name: string;
    role: UserRole;
    phone?: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("auth_token");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with real API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Find mock user by email
      const foundUser = mockUsers.find((u) => u.email === email);
      if (!foundUser) {
        throw new Error("Invalid credentials");
      }

      // Simulate JWT token
      const token = `mock_jwt_token_${foundUser.id}_${Date.now()}`;
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user", JSON.stringify(foundUser));
      setUser(foundUser);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const register = async (data: {
    email: string;
    password: string;
    name: string;
    role: UserRole;
    phone?: string;
  }) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newUser: User = {
        id: `user_${Date.now()}`,
        email: data.email,
        name: data.name,
        role: data.role,
        phone: data.phone,
        isVerified: false,
        isApproved: data.role === "DONOR", // Donors auto-approved
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const token = `mock_jwt_token_${newUser.id}_${Date.now()}`;
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
