"use client";

import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const useAuth = () => {
  const { user, token, setAuth, logout: clearAuth } = useAuthStore();
  const router = useRouter();

  const login = useCallback(async (email: string) => {
    // Simulating an API call for JWT authentication
    // In a real app, you would use axios.post('/api/login', { email, password })
    try {
      const mockUser = { 
        id: 1, 
        name: 'Technical Tester', 
        email: email 
      };
      const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_token_value";

      // Save to Zustand (and localStorage via middleware)
      setAuth(mockUser, mockToken);
      
      // Redirect authorized user
      router.push('/dashboard');
    } catch (error) {
      console.error("Login failed", error);
    }
  }, [setAuth, router]);

  const logout = useCallback(() => {
    clearAuth();
    router.push('/login');
  }, [clearAuth, router]);

  return {
    user,
    token,
    isAuthenticated: !!token,
    login,
    logout,
  };
};